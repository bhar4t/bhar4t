import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { pojoaque } from "react-syntax-highlighter/dist/cjs/styles/prism";

class CodeBlock extends PureComponent {
  static propTypes = {
    value: PropTypes.string.isRequired,
    language: PropTypes.string,
  };

  static defaultProps = {
    language: null,
  };

  render() {
    const { language, value } = this.props;
    return (
      <SyntaxHighlighter
        language={language}
        style={pojoaque}
        codeTagProps="code"
        customStyle={{
          display: "block",
          overflowX: "auto",
          background: "rgb(28, 29, 33)",
          color: "rgb(192, 197, 206)",
          padding: "1.7em",
          borderEadius: 6,
          lineHeight: "2.3em",
          fontFamily:
            "ibm-plex-mono, Consolas, Monaco, 'Lucida Console', 'Liberation Mono', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', 'Courier New'",
        }}
      >
        {value}
      </SyntaxHighlighter>
    );
  }
}
export default CodeBlock;
