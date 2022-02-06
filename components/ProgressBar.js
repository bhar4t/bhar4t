import React, { Component } from "react";

class ProgressBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: null
    };
  }

  componentDidMount() {
    try {
      window.addEventListener("scroll", this.scrolling);
    } catch (oError) {
      console.log(oError);
    }
  }

  componentWillUnmount() {
    try {
      window.removeEventListener("scroll", this.scrolling);
    } catch (oError) {
      console.log(oError);
    }
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