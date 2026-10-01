import Image from "next/image";
import Layout from "../../components/layout";
import { buildPageMetadata } from "../../lib/seo";
import { articleKeys, articleKey, card, textContainer, articleTitle, articleDesc, h1, sectionHeading } from "../../styles/utils.module.css";

export const metadata = buildPageMetadata({
  title: "",
  description: "Tools built by Bharat Sahu, including a peer-to-peer video meet app, plus open source NPM packages for JavaScript and React developers.",
  canonical: "tools",
});

// npms.io's bulk endpoint (the previous data source) is an unmaintained,
// community-run service prone to outages; the official npm registry is far
// more reliable, so package metadata is fetched from there per-request below.
export const dynamic = "force-dynamic";

const TOOLS = [
  {
    name: "Meet",
    href: "/meet",
    description: "Peer-to-peer WebRTC video calls — create or join a room instantly, no sign-up required.",
  },
];

export default async function Tools() {
  const { data, error } = await getPackagesData();

  return (
    <Layout home>
      <h1 className={h1}>Tools & Packages</h1>

      <h2 className={sectionHeading}>Tools</h2>
      {TOOLS.map((tool) => (
        <div key={tool.name} className={card}>
          <div className={textContainer}>
            <a href={tool.href} className={articleTitle}>{tool.name}</a>
            <div className={articleDesc}>{tool.description}</div>
          </div>
        </div>
      ))}

      <h2 className={sectionHeading}>Packages</h2>
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

// Fetched per-request (not statically cached) via `export const dynamic` above.
// Each package is requested independently so one bad/renamed package name
// doesn't blank out the whole section - the error banner only shows if every
// request fails (e.g. a genuine registry outage).
async function getPackagesData() {
  const names = (process.env.PACKAGES || "").split(" ").filter(Boolean);
  if (!names.length) {
    // Silently rendering nothing here is indistinguishable from "intentionally no
    // packages" - log loudly so a missing/misscoped env var is visible in prod logs.
    console.error("PACKAGES env var is empty or unset - no package data will be fetched.");
    return { data: [], error: false };
  }

  const results = await Promise.allSettled(names.map(fetchPackageInfo));

  const data = [];
  results.forEach((result, i) => {
    if (result.status === "fulfilled") {
      data.push(result.value);
    } else {
      console.error(`Failed to fetch package info for "${names[i]}":`, result.reason);
    }
  });

  return { data, error: data.length === 0 };
}

async function fetchPackageInfo(name) {
  const res = await fetch(`https://registry.npmjs.org/${encodeURIComponent(name)}`, {
    cache: "no-store",
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) {
    throw new Error(`npm registry responded with ${res.status} for "${name}"`);
  }
  const doc = await res.json();
  const license = typeof doc.license === "string" ? doc.license : doc.license?.type || "";

  return {
    name: doc.name || name,
    description: doc.description || "Missing description",
    keywords: doc.keywords || [],
    npm: `https://www.npmjs.com/package/${doc.name || name}`,
    license,
  };
}
