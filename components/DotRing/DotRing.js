"use client";

import React, { useContext } from "react";
import styles from "./DotRing.module.css";
import useMousePosition from "../../hooks/useMousePosition";
import { MouseContext } from "../../context/mouse-context";

const DotRing = () => {
  const { cursorType, cursorChangeHandler } = useContext(MouseContext);

  const { x, y } = useMousePosition();
  const transform = x === null ? undefined : `translate(${x}px, ${y}px) translate(-50%, -50%)`;
  return (
    <>
      <div
        style={{ transform }}
        className={styles.ring +" "+ cursorType}
      ></div>
      <div
        className={styles.dot +" "+ cursorType}
        style={{ transform }}
      ></div>
    </>
  );
};

export default DotRing;