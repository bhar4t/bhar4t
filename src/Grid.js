import React, { Component } from "react";
import StackGrid from "react-stack-grid";

const GitHub = () => (
  <>
    <div
      class="github-card"
      data-github="bhar4t"
      data-width="400"
      data-height="316"
      data-theme="medium"
    ></div>
    <script src="//cdn.jsdelivr.net/github-cards/latest/widget.js"></script>
  </>
);

const LinkedIn = () => (
  <div
    class="LI-profile-badge"
    data-version="v1"
    data-size="large"
    data-locale="en_US"
    data-type="vertical"
    data-theme="dark"
    data-vanity="bhar4t"
  >
    <a
      class="LI-simple-link"
      href="https://in.linkedin.com/in/bhar4t?trk=profile-badge"
    >
      Bharat Sahu
    </a>
  </div>
);

const Twitter = () => (
  <a class="twitter-timeline" href="https://twitter.com/bhar4t">
    Tweets by bhar4t
  </a>
);

const StackOverflow = () => (
  <a href="https://stackoverflow.com/users/7242575/bharat-sahu">
    <img
      src="https://stackoverflow.com/users/flair/7242575.png?theme=dark"
      width="208"
      height="58"
      alt="profile for Bharat Sahu at Stack Overflow, QnA for professional and enthusiast programmers"
      title="profile for Bharat Sahu at Stack Overflow, QnA for professional and enthusiast programmers"
    />
  </a>
);

export default class MyComponent extends Component {
  render() {
    return (
      <StackGrid columnWidth={400} width={window.innerWidth}>
        <div key="key1">
          <StackOverflow />
        </div>
        <div key="key2">
          <LinkedIn />
        </div>
        <div key="key3">
          <GitHub />
        </div>
        <div
          key="key4"
          style={{ maxHeight: 400, width: 400, overflow: "hidden" }}
        >
          <Twitter />
        </div>
      </StackGrid>
    );
  }
}
