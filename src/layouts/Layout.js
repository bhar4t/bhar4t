import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { DayNight } from "../components/Icons";

export default function (props) {
  const [width, setWidth] = React.useState(window.innerWidth);
  const [isMobile, setMobile] = React.useState(width <= 768);
  const handler = React.useCallback(() => {
    setWidth(window.innerWidth);
    setMobile(window.innerWidth <= 768);
  }, [setWidth]);
  useEventListener("resize", handler);

  const Button = (props) => (
    <a href={props.path} className="simpleButton">
      {props.label}
    </a>
  );

  const Header = () => (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Button label="Home" path="/" />
        <Button label="About" path="/" />
        <Button label="Work" path="/" />
      </div>
      <div onClick={props.toggleNightMode}>
        <DayNight nightMode={props.nightMode} />
      </div>
    </div>
  );

  const Footer = () => useFooter();
  const SocialLinks = () => useSocial();

  if (isMobile)
    return (
      <Container>
        <Row>
          <Col xs={12}>{<Header />}</Col>
        </Row>
        <Row>
          <Col xs={12}>{props.children}</Col>
        </Row>
        <Row>
          <Col xs={12}>
            <SocialLinks />
            <Footer />
          </Col>
        </Row>
      </Container>
    );
  else
    return (
      <Container>
        <Row>
          <Col />
          <Col xs={12}>{<Header />}</Col>
          <Col />
        </Row>
        <Row>
          <Col />
          <Col xs={10}>{props.children}</Col>
          <Col />
        </Row>
        <Row>
          <Col />
          <Col xs={10}>
            <SocialLinks />
            <Footer />
          </Col>
          <Col />
        </Row>
      </Container>
    );
}

function useEventListener(eventName, handler, element = window) {
  const savedHandler = React.useRef();
  React.useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  React.useEffect(() => {
    const isSupported = element && element.addEventListener;
    if (!isSupported) return;
    const eventListener = (event) => savedHandler.current(event);
    element.addEventListener(eventName, eventListener);
    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
}

function useFooter() {
  return (
    <div
      style={{
        width: "100%",
        height: "18vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <span style={{ color: "gray", fontSize: 12 }}>&copy; 2020</span>
    </div>
  );
}

function useSocial() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        border: "3px yellow dashed",
        padding: 30,
        borderRadius: 8,
        fontSize: 18,
        lineHeight: "1.9em",
        flexWrap: "wrap",
      }}
    >
      <a
        style={{ padding: "0px 10px" }}
        href="https://stackoverflow.com/users/7242575/bhar4t"
      >
        StackOverflow
      </a>
      <a style={{ padding: "0px 10px" }} href="https://github.com/bhar4t">
        GitHub
      </a>
      <a
        style={{ padding: "0px 10px" }}
        href="https://www.linkedin.com/in/bhar4t/"
      >
        LinkedIn
      </a>
      <a style={{ padding: "0px 10px" }} href="https://twitter.com/bhar4t">
        Twitter
      </a>
      <a
        style={{ padding: "0px 10px" }}
        href="https://www.instagram.com/bhar4t"
      >
        instagram
      </a>
      <a
        style={{ padding: "0px 10px" }}
        href="https://www.facebook.com/bharat.sahu"
      >
        FaceBook
      </a>
    </div>
  );
}
