import React from "react";
import Head from "next/head";
import { useDarkMode } from 'next-dark-mode'
import { Container, Row, Col } from "react-bootstrap";
import ProgressBar from "../components/ProgressBar";
import { DayNight } from "./Icons";
import mobile from "is-mobile";
import styles from "./layout.module.css";

const buttons = [
  { label: "HOME", path: "/" },
  { label: "@bhar4t", path: "/bhar4t" },
  { label: "PACKAGES", path: "/packages" },
];

const apple_icons = ["57x57", "60x60", "72x72", "76x76", "114x114", "120x120", "144x144", "152x152", "180x180"];
const favicons = ["16x16", "32x32", "96x96"];

export default function Layout({ children, home, keywords, ...props }) {
  const { darkModeActive, switchToDarkMode, switchToLightMode, } = useDarkMode();
  
  React.useEffect(() => {
    document?.documentElement?.setAttribute("data-theme", darkModeActive ? 'dark' : 'light');
  }, []);

  React.useEffect(() => {
    document?.documentElement?.setAttribute("data-theme", darkModeActive ? 'dark' : 'light');
  }, [darkModeActive]);

  const Header = () =>
    useHeader(
      <div onClick={darkModeActive ? switchToLightMode : switchToDarkMode}>
        <DayNight nightMode={darkModeActive} />
      </div>
    );
  return (
    <>
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
          content={keywords ?  `${keywords}, Bharat, Sahu, BHAR4T,` : "Bharat, Sahu, BHAR4T, JavaScript, JS, Node, NodeJS, Cordova, Firebase, Firestore, Java, HTML, CSS, Bootstrap, India, Bharat Lal Sahu, Raipur, Chhattisgarh, React, ReactJS, Programmer, Programming, Coding, Bharat Sahu, Mats University, SmileBots, 9589183373, seizedbharat@gmail.com"}
        />
        <link rel="manifest" href="/manifest.json" />

        {/* Favicon Generator */}
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/images/android-icon-192x192.png"
        />
        {apple_icons.map((size, i) =>
          <link
            key={i}
            rel="apple-touch-icon"
            sizes={size}
            href={`/images/apple-icon-${size}.png`}
          />
        )}
        {
          favicons.map((size, i) => (
            <link
              key={i}
              rel="icon"
              type="image/png"
              sizes={size}
              href={`/images/favicon-${size}.png`}
            />
          ))
        }

        <meta name="msapplication-TileColor" content="#d3bf00" />
        <meta
          name="msapplication-TileImage"
          content="/images/ms-icon-144x144.png"
        />
        <meta name="theme-color" content="#d3bf00" />

        {/* Media Card (Open Graph) */}
        <meta
          property="og:title"
          content={props.title || "Code with Bharat Sahu | JavaScript, ReactJS, NextJS, Firebase, Cordova | BHAR4T"}
        />
        <meta
          property="og:site_name"
          content={props.title || "Bharat Sahu | BHAR4T"}
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
              : `https://bhar4t.com/${props.canonical || ""}`
          }
        />
        <title>{props.title || "Bharat Sahu | BHAR4T"}</title>
      </Head>
        <ProgressBar />
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
                Back to Home
              </a>
            )}
            {props.download && (
              <a href="/resume.pdf" className={styles.simpleButton}>
                Download as PDF
              </a>
            )}
          </Container>
        </main>
    </>
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