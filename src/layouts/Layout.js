import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function (props) {
  const [width, setWidth] = React.useState(window.innerWidth);
  const [isMobile, setMobile] = React.useState(width <= 768);
  const handler = React.useCallback(() => {
    setWidth(window.innerWidth);
    setMobile(window.innerWidth <= 768);
  }, [setWidth]);
  useEventListener("resize", handler);

  if (isMobile)
    return (
      <Container>
        <Row>
          <Col xs={12}>{props.children}</Col>
        </Row>
      </Container>
    );
  else
    return (
      <Container>
        <Row>
          <Col />
          <Col xs={10}>{props.children}</Col>
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
