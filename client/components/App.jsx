import React, { Component } from "react";
import { MainWrapper, Title } from './../Styles/styledComponents';
import OptionsDisplay from "./OptionsDisplay.jsx";
import ChartDisplay from "./ChartDisplay.jsx";
import CodeDisplay from "./CodeDisplay.jsx";

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [20, 50, 100, 70],
      codeText: "",
      type: "barChart",
      graphs: {
        barChart: [
          "barColor",
          "barMargin",
          "chartHeight",
          "chartWidth",
          "chartBGColor",
          "xTitle",
          "yTitle",
          "chartTitle"
        ]
      },
      chartTitle: { value: "Name", type: "text" },
      chartHeight: { value: 500, type: "number" },
      chartWidth: { value: 700, type: "number" },
      chartBGColor: { value: "#4286f4", type: "color" },
      xTitle: { value: "xTitle", type: "text" },
      yTitle: { value: "xTitle", type: "text" },
      barColor: { value: "#4211f4", type: "color" },
      barMargin: { value: 2, type: "number" }
    };
    this.handleChange = this.handleChange.bind(this);
    this.updateCodeText = this.updateCodeText.bind(this);
  }

  handleChange(e) {
    let { name, type, value } = e.target;
    if (type === 'number') {
      value = Number(value);
    }
    const newObj = Object.assign({}, this.state[name]);
    newObj.value = value;
    this.setState({
      [name]: newObj
    });
  }

  updateCodeText(codeText) {
    this.setState({ codeText });
  }

  render() {
    const { graphs, type } = this.state;
    const optionsToPass = graphs[type].reduce((acc, option) => {
      acc[option] = this.state[option];
      return acc;
    }, {});
    return (
      <MainWrapper>
        <Title> D3 Simplifier </Title>
        <OptionsDisplay
          options={optionsToPass}
          handleChange={this.handleChange}
        />
        <ChartDisplay options={optionsToPass} data={this.state.data} 
          updateCodeText={this.updateCodeText} codeText={this.state.codeText} />
        <CodeDisplay codeText={this.state.codeText} />
      </MainWrapper>
    );
  }
}

export default App;
