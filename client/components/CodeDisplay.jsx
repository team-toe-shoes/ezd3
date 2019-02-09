import React, { Component } from "react";
import Prism from "prismjs";
import "../Styles/prism.css";

class CodeDisplay extends Component {
  componentDidUpdate() {
    // We need to re-style the code everytime we change it
    Prism.highlightAll();
  }

  render() {
    return (      
      <pre>
        <code className="language-javascript">
          {this.props.codeText}      
        </code>
      </pre>
    );
  }
}

export default CodeDisplay;