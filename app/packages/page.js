import Image from "next/image";
import Layout from "../../components/layout";
import { buildPageMetadata } from "../../lib/seo";
import { articleKeys, articleKey, card, textContainer, articleTitle, articleDesc, h1 } from "../../styles/utils.module.css";

export const metadata = buildPageMetadata({
  title: "Open Source NPM Packages",
  description: "Open source NPM packages built and published by Bharat Sahu for JavaScript and React developers.",
  canonical: "packages",
});

export default async function Packages() {
  const { data, error } = await getPackagesData();

  return (
    <Layout home>
      <h1 className={h1}>Open Source NPM Packages</h1>
      {error && (
        <p className={articleDesc}>
          Couldn&apos;t load packages right now. Please try again in a moment.
        </p>
      )}
      {
        data.map((pkg) => (
          <div key={pkg.name} className={card}>
            <div className={textContainer}>
              <a href={pkg.npm} className={articleTitle}>{pkg.name}</a>
              <div style={{ display: "flex", justifyContent: "center", alignItems: 'center', position: "relative", float: "right", top: 0 }}>
                <Image style={{ display: 'inline', margin: 4 }} src="/images/npm.svg" alt="NPM" width={16} height={16} />
                {pkg.license && <Image style={{ display: 'inline', margin: 4 }} src="/images/MIT_logo.svg" alt="MIT" width={14} height={14} />}
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

// Fetched per-request (not statically cached), mirroring the previous getServerSideProps behavior
async function getPackagesData() {
  try {
    const res = await fetch(process.env.NPM_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(process.env.PACKAGES.split(" ")),
      cache: 'no-store',
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
      throw new Error(`npms.io responded with ${res.status}`);
    }
    const data = await res.json();
    return { data: getFormattedData(data), error: false };
  } catch (err) {
    // Next.js signals dynamic-rendering detection as a thrown error during the
    // build's static-generation probe (e.g. digest "DYNAMIC_SERVER_USAGE") — that
    // must propagate, not be swallowed as a real fetch failure.
    if (err?.digest?.startsWith("NEXT_") || err?.digest === "DYNAMIC_SERVER_USAGE") {
      throw err;
    }
    console.error("Failed to fetch package data:", err);
    return { data: [], error: true };
  }
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
