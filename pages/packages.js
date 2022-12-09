import Layout from "../components/layout";
import { articleKeys, articleKey, card, textContainer, articleTitle, articleDesc } from "../styles/utils.module.css";

export default function Packages({ data }) {
  console.log(data)
  return (
    <Layout home canonical="packages" removeSocialLinks>
      {
        data
          .map((pkg, i) => (
          <div key={pkg.name} className={card}>
            <div className={textContainer}>
              <a href={pkg.npm} className={articleTitle}>{pkg.name}</a>
              <div style={{ display: "flex", justifyContent: "center", alignItems: 'center', position: "relative", float: "right", top: 0 }}>
                <img style={{ display: 'inline', margin: 4 }} src="./images/npm.svg" alt="NPM" height="16px"></img>
                {pkg.license && <img style={{ display: 'inline', margin: 4 }} src="./images/MIT_logo.svg" alt="MIT" height="14px"></img>}
              </div>
              <div className={articleDesc}>{pkg.description}</div>
              <div className={articleKeys}>
                  {pkg.keywords.map(e => <span key={e} className={articleKey}>{e}</span>)}
              </div>
            </div>
          </div>
          ))
      }
    </Layout>
  );
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(process.env.NPM_URL, {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(process.env.PACKAGES.split(" ")),
  })
  const data = await res.json()
  const formattedData = getFormattedData(data)
  // Pass data to the page via props
  return { props: { data: formattedData } }
}

function getFormattedData(data) {
  return Object.values(data).map(({ collected: { metadata } }) => {
    return ({
      description: metadata?.description || "Missing description",
      keywords: metadata?.keywords || [],
      npm: metadata.links?.npm || "Missing NPM url",
      repository: metadata.links?.repository || "",
      name: metadata.name || "Missing name",
      license: metadata.license || "",
      metadata,
    })
  })
}