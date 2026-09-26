"use client";

import React from "react";
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
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.col} />
            <div className={styles.col8}>{children}</div>
            <div className={styles.col} />
          </div>
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
        </div>
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