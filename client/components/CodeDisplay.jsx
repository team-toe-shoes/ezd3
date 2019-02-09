import React, { Component } from "react";
import Prism from "prismjs";
import "../Styles/prism.css";

class CodeDisplay extends Component {
  componentDidUpdate() {
    Prism.highlightAll();
  }

  render() {
    const code = this.props.codeText;
    const codeArr = [];
    let currStr = '';
    for (let char of code) {
      if (char !== '\n') {
        currStr += char;
      } else {
        codeArr.push(<p>{currStr}</p>);
        currStr = '';
      }
    }
    codeArr.push(<p>{currStr}</p>);

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