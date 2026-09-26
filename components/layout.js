"use client";

import React from "react";
import Link from "next/link";
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
      <button
        type="button"
        className={styles.themeToggle}
        onClick={darkModeActive ? switchToLightMode : switchToDarkMode}
        aria-label={darkModeActive ? "Switch to light mode" : "Switch to dark mode"}
        aria-pressed={darkModeActive}
      >
        <DayNight nightMode={darkModeActive} />
      </button>
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
            <Link href="/" className={styles.simpleButton}>
              Back to Home
            </Link>
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
    <Link href={path} className={styles.simpleButton}>
      {label}
    </Link>
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