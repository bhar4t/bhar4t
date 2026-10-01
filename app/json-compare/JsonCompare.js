"use client";

import React from "react";
import styles from "./JsonCompare.module.css";

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function formatValue(value) {
  if (value === undefined) return "undefined";
  const str = JSON.stringify(value);
  return str.length > 80 ? `${str.slice(0, 80)}…` : str;
}

// Recursively walks both values, collecting one entry per path where they diverge.
function diffValues(left, right, path, diffs) {
  if (left === right) return;

  const leftIsArray = Array.isArray(left);
  const rightIsArray = Array.isArray(right);

  if (leftIsArray && rightIsArray) {
    const maxLength = Math.max(left.length, right.length);
    for (let i = 0; i < maxLength; i++) {
      const childPath = `${path}[${i}]`;
      if (i >= left.length) diffs.push({ path: childPath, type: "added", right: right[i] });
      else if (i >= right.length) diffs.push({ path: childPath, type: "removed", left: left[i] });
      else diffValues(left[i], right[i], childPath, diffs);
    }
    return;
  }

  if (isPlainObject(left) && isPlainObject(right)) {
    const keys = new Set([...Object.keys(left), ...Object.keys(right)]);
    keys.forEach((key) => {
      const childPath = path ? `${path}.${key}` : key;
      if (!(key in left)) diffs.push({ path: childPath, type: "added", right: right[key] });
      else if (!(key in right)) diffs.push({ path: childPath, type: "removed", left: left[key] });
      else diffValues(left[key], right[key], childPath, diffs);
    });
    return;
  }

  diffs.push({ path: path || "(root)", type: "changed", left, right });
}

export default function JsonCompare() {
  const [leftText, setLeftText] = React.useState("");
  const [rightText, setRightText] = React.useState("");
  const [result, setResult] = React.useState(null); // { equal: true } | { equal: false, diffs }
  const [errorMessage, setErrorMessage] = React.useState(null);

  // Auto-dismiss so an invalid-JSON popup doesn't linger forever if the user ignores it.
  React.useEffect(() => {
    if (!errorMessage) return;
    const timer = setTimeout(() => setErrorMessage(null), 4000);
    return () => clearTimeout(timer);
  }, [errorMessage]);

  function handleCompare() {
    let left;
    let right;

    try {
      left = JSON.parse(leftText);
    } catch (err) {
      setErrorMessage(`Left JSON is invalid: ${err.message}`);
      return;
    }

    try {
      right = JSON.parse(rightText);
    } catch (err) {
      setErrorMessage(`Right JSON is invalid: ${err.message}`);
      return;
    }

    const diffs = [];
    diffValues(left, right, "", diffs);
    setResult(diffs.length === 0 ? { equal: true } : { equal: false, diffs });
  }

  function handleReset() {
    setLeftText("");
    setRightText("");
    setResult(null);
    setErrorMessage(null);
  }

  return (
    <div className={styles.wrapper}>
      {errorMessage && (
        <div className={styles.errorPopup} role="alert">
          <span>{errorMessage}</span>
          <button
            type="button"
            className={styles.errorPopupClose}
            onClick={() => setErrorMessage(null)}
            aria-label="Dismiss error"
          >
            ×
          </button>
        </div>
      )}

      <div className={styles.grid}>
        <textarea
          className={styles.textarea}
          placeholder="Paste JSON A here"
          value={leftText}
          onChange={(e) => setLeftText(e.target.value)}
          spellCheck={false}
          aria-label="JSON A"
        />
        <textarea
          className={styles.textarea}
          placeholder="Paste JSON B here"
          value={rightText}
          onChange={(e) => setRightText(e.target.value)}
          spellCheck={false}
          aria-label="JSON B"
        />
      </div>

      <div className={styles.actions}>
        <button type="button" className={styles.compareButton} onClick={handleCompare}>
          Compare
        </button>
        <button type="button" className={styles.resetButton} onClick={handleReset}>
          Reset
        </button>
      </div>

      {result?.equal === true && <p className={styles.success}>JSON values are equal.</p>}
      {result?.equal === false && (
        <ul className={styles.diffList}>
          {result.diffs.map((diff, i) => (
            <li key={i} className={styles.diffItem}>
              <span className={styles.diffPath}>{diff.path}</span>
              {diff.type === "added" && <span> added: {formatValue(diff.right)}</span>}
              {diff.type === "removed" && <span> removed: {formatValue(diff.left)}</span>}
              {diff.type === "changed" && (
                <span> changed: {formatValue(diff.left)} → {formatValue(diff.right)}</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
