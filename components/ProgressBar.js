"use client";

import React, { Component } from "react";

class ProgressBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: null
    };
    this.rafId = null;
  }

  componentDidMount() {
    try {
      window.addEventListener("scroll", this.onScroll, { passive: true });
    } catch (oError) {
      console.log(oError);
    }
  }

  componentWillUnmount() {
    try {
      window.removeEventListener("scroll", this.onScroll);
    } catch (oError) {
      console.log(oError);
    }
    if (this.rafId !== null) cancelAnimationFrame(this.rafId);
  }

  // Coalesce scroll events into at most one layout read/state update per frame.
  onScroll = () => {
    if (this.rafId !== null) return;
    this.rafId = requestAnimationFrame(() => {
      this.rafId = null;
      this.scrolling();
    });
  }

  scrolling = () => {
    const { body, documentElement: dE } = document;
    const winScroll = body.scrollTop || dE.scrollTop;
    const height = dE.scrollHeight - dE.clientHeight;
    const scrolled = (winScroll / height) * 100;
    if (height > 0) this.setState({ width: `${scrolled}%` });
    else this.setState({ width: null });
  }

  render() {
    const { width } = this.state;
    return <div
        style={{
            margin: 0,
            padding: 0,
            position: "fixed",
            top: 0,
            zIndex: "99",
            backgroundColor: "var(--primary)",
            height: 2,
            width: `${width}`,
            transitionProperty: "width",
            transitionDuration: "0.2s",
            transitionTimingFunction: "ease-out",
          }}
        />;
  }
}

export default ProgressBar;