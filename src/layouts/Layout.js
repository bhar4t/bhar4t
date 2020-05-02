import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { DayNight } from "../components/Icons";

const buttons = [
  { label: "Home", path: "/" },
  { label: "About", path: "/" },
  { label: "Work", path: "/" },
];

const links = [
  {
    title: "StackOverflow",
    url: "https://stackoverflow.com/users/7242575/bhar4t",
  },
  { title: "GitHub", url: "https://github.com/bhar4t" },
  { title: "LinkedIn", url: "https://www.linkedin.com/in/bhar4t/" },
  { title: "Twitter", url: "https://twitter.com/bhar4t" },
  { title: "instagram", url: "https://www.instagram.com/bhar4t" },
  { title: "FaceBook", url: "https://www.facebook.com/bharat.sahu" },
];

export default function (props) {
  const [width, setWidth] = React.useState(window.innerWidth);
  const [isMobile, setMobile] = React.useState(width <= 768);
  const handler = React.useCallback(() => {
    setWidth(window.innerWidth);
    setMobile(window.innerWidth <= 768);
  }, [setWidth]);
  useEventListener("resize", handler);

  const Footer = () => useFooter();
  const SocialLinks = () => useSocial();

  const [nightMode, setNightMode] = React.useState(
    Boolean(JSON.parse(localStorage.getItem("NIGHT_MODE")))
  );
  const toggleNightMode = () => setNightMode(!nightMode);

  React.useEffect(() => {
    if (nightMode) document.documentElement.setAttribute("theme", "dark");
    else document.documentElement.removeAttribute("theme");
    localStorage.setItem("NIGHT_MODE", nightMode);
  }, [nightMode]);

  const Header = () =>
    useHeader(
      <div onClick={toggleNightMode}>
        <DayNight nightMode={nightMode} />
      </div>
    );

  return (
    <Container>
      <Col xs={12}>{<Header />}</Col>
      {isMobile ? (
        <Row>
          <Col xs={12}>{props.children}</Col>
        </Row>
      ) : (
        <Row>
          <Col />
          <Col xs={10}>{props.children}</Col>
          <Col />
        </Row>
      )}
      <div style={{ position: "static", bottom: 0 }}>
        {props.social && <SocialLinks />}
        <Footer />
      </div>
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

function useHeader(NightMode) {
  const Button = ({ path, label }) => (
    <a href={path} className="simpleButton">
      {label}
    </a>
  );
  return (
    <div className="header">
      <div className="header-buttons">
        {buttons.map((e, i) => (
          <Button key={i} label={e.label} path={e.path} />
        ))}
      </div>
      {NightMode}
    </div>
  );
}

function useFooter() {
  return (
    <div className="footer">
      <span style={{ fontSize: 12 }}>&copy; 2020</span>
    </div>
  );
}

function useSocial() {
  return (
    <div className="social-links">
      {links.map((e, i) => (
        <a key={i} style={{ padding: "0px 10px" }} href={e.url}>
          {e.title}
        </a>
      ))}
    </div>
  );
}
