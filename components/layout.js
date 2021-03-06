import React from "react";
import Head from "next/head";
import styles from "./layout.module.css";
import { Container, Row, Col } from "react-bootstrap";
import { DayNight } from "./Icons";
import mobile from "is-mobile";

const name = "Bharat Sahu";
export const siteTitle = "Code with Bharat Sahu";

const buttons = [
  { label: "HOME", path: "/" },
  { label: "ABOUT", path: "/about" },
];

const links = [
  {
    title: "StackOverflow",
    url: "https://stackoverflow.com/users/7242575/bhar4t",
  },
  { title: "GitHub", url: "https://github.com/bhar4t" },
  { title: "LinkedIn", url: "https://www.linkedin.com/in/bhar4t/" },
  { title: "Twitter", url: "https://twitter.com/bhar4t" },
  { title: "instagram", url: "https://www.instagram.com/bhar4t" },
  { title: "FaceBook", url: "https://www.facebook.com/bharat.sahu" },
];

export default function Layout({ children, home, ...props }) {
  const localNightMode =
    typeof localStorage !== "undefined" &&
    Boolean(JSON.parse(localStorage.getItem("NIGHT_MODE")));
  let [nightMode, toggleNightMode] = React.useState(localNightMode);
  const setNightMode = () => toggleNightMode(!nightMode);

  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", nightMode && "dark");
    localStorage.setItem("NIGHT_MODE", nightMode);
  }, []);

  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", nightMode && "dark");
    localStorage.setItem("NIGHT_MODE", nightMode);
  }, [nightMode]);

  const Footer = () => useFooter();
  const SocialLinks = () => useSocial();

  const Header = () =>
    useHeader(
      <div onClick={setNightMode}>
        <div>
          <DayNight nightMode={nightMode} />
        </div>
      </div>
    );
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content={
            props.title ||
            "Hello, I'm Bharat Sahu, A Web App Developer, Here I want to share some coding stuff which I've learned while coding. I also trying to make these simpler so anybody can start with it."
          }
        />
        <meta
          name="keywords"
          content="Bharat, Sahu, BHAR4T, JavaScript, JS, Node, NodeJS, Cordova, Firebase, Firestore, Java, HTML, CSS, Bootstrap, India, Bharat Lal Sahu, Raipur, Chhattisgarh, React, ReactJS, Programmer, Programming, Coding, Bharat Sahu, Mats University, SmileBots, 9589183373, seizedbharat@gmail.com"
        />
        <link rel="manifest" href="/manifest.json" />

        {/* Favicon Generator */}
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/images/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/images/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/images/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/images/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/images/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/images/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/images/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/images/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/images/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/images/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/favicon-16x16.png"
        />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta
          name="msapplication-TileImage"
          content="/images/ms-icon-144x144.png"
        />
        <meta name="theme-color" content="#ffffff" />

        {/* Media Card (Open Graph) */}
        <meta
          property="og:title"
          content={props.title || "Bharat Sahu | BHAR4T"}
        />
        <meta
          property="og:site_name"
          content={props.title || "Code with Bharat Sahu | BHAR4T"}
        />
        <meta
          property="og:url"
          content={
            props.id
              ? `https://bhar4t.com/articles/${props.id}`
              : "https://bhar4t.com"
          }
        />
        <meta
          property="og:description"
          content={
            props.title ||
            "Hello, I'm Bharat Sahu, Here I just want to share some coding stuff that I've learned while coding. I also trying to make everything simpler so anybody can start with it."
          }
        />
        <meta property="og:type" content="article" />
        <meta
          property="og:image"
          content={
            props.cover
              ? `https://bhar4t.com/img/${props.cover}`
              : "https://bhar4t.com/images/bhar4t-fb.png"
          }
        />
        <meta
          property="og:image"
          content={
            props.cover
              ? `https://bhar4t.com/img/${props.cover}`
              : "https://bhar4t.com/images/bhar4t-fb.png"
          }
        />
        {/* Media Card (Facebook) */}
        <meta property="fb:app_id" content="2572611269617452" />
        {/* Media Card (Twitter) */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@bhar4t" />
        <meta
          name="twitter:description"
          content={
            props.title ||
            "Hello, I'm Bharat Sahu, Here I just want to share some coding stuff that I've learned while coding. I also trying to make everything simpler so anybody can start with it."
          }
        />
        <meta
          name="twitter:app:name:iphone"
          content={props.title || "Bharat Sahu | BHAR4T"}
        />
        <meta
          name="twitter:app:name:ipad"
          content={props.title || "Bharat Sahu | BHAR4T"}
        />
        <meta
          name="twitter:app:name:googleplay"
          content={props.title || "Bharat Sahu | BHAR4T"}
        />
        <meta name="twitter:app:country" content="India" />
        {/* Canonical */}
        <link
          rel="canonical"
          href={
            props.id
              ? `https://bhar4t.com/articles/${props.id}`
              : "https://bhar4t.com/"
          }
        />

        <title>{props.title || "Bharat Sahu | BHAR4T"}</title>
      </Head>
      <header className={styles.header}>{<Header />}</header>
      <main>
        <Container>
          {mobile() ? (
            <Row>
              <Col xs={12}>{children}</Col>
            </Row>
          ) : (
              <Row>
                <Col />
                <Col xs={8}>{children}</Col>
                <Col />
              </Row>
            )}
          {!home && (
            <a href="/" className={styles.simpleButton}>
              Back to home
            </a>
          )}
          <SocialLinks />
        </Container>
      </main>
      <footer>
        <Footer />
      </footer>
    </html>
  );
}

function useHeader(NightMode) {
  const Button = ({ path, label }) => (
    <a href={path} className={styles.simpleButton}>
      {label}
    </a>
  );
  return (
    <div className={styles.header}>
      <div className={styles.headerButtons}>
        {buttons.map((e, i) => (
          <Button key={i} label={e.label} path={e.path} />
        ))}
      </div>
      {NightMode}
    </div>
  );
}

function useFooter() {
  return (
    <div className={styles.footer}>
      <span style={{ fontSize: 12 }}>&copy; 2020</span>
    </div>
  );
}

function useSocial() {
  return (
    <div className={styles.socialLinks}>
      {links.map((e, i) => (
        <a key={i} style={{ padding: "0px 10px" }} href={e.url}>
          {e.title}
        </a>
      ))}
    </div>
  );
}
