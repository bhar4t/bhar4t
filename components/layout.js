"use client";

import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import mobile from "is-mobile";
import ProgressBar from "../components/ProgressBar";
import { DayNight } from "./Icons";
import { useDarkMode } from "../context/theme-context";
import styles from "./layout.module.css";

const buttons = [
  { label: "Home", path: "/" },
  { label: "@bhar4t", path: "/bhar4t" },
  { label: "Packages", path: "/packages" },
];

export default function Layout({ children, home, download }) {
  const { darkModeActive, switchToDarkMode, switchToLightMode } = useDarkMode();

  const Header = () =>
    useHeader(
      <div onClick={darkModeActive ? switchToLightMode : switchToDarkMode}>
        <DayNight nightMode={darkModeActive} />
      </div>
    );

  return (
    <>
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
          {download && (
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