"use client";

import { useEffect, useState } from "react";

export default function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });

  useEffect(() => {
    let rafId = null;
    let latestEvent = null;

    const applyPosition = () => {
      rafId = null;
      setMousePosition({ x: latestEvent.clientX, y: latestEvent.clientY });
    };

    // Coalesce every mousemove into at most one state update per animation frame.
    const mouseMoveHandler = (event) => {
      latestEvent = event;
      if (rafId === null) {
        rafId = requestAnimationFrame(applyPosition);
      }
    };
    document.addEventListener("mousemove", mouseMoveHandler, { passive: true });

    return () => {
      document.removeEventListener("mousemove", mouseMoveHandler);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return mousePosition;
}