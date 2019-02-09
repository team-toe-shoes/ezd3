import React, { Component } from "react";
import {  MainWrapper, Title } from './../Styles/styledComponents';
import OptionsDisplay from "./OptionsDisplay.jsx";
import ChartDisplay from "./ChartDisplay.jsx";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [20, 50, 100, 70],
      type: "barChart",
      graphs: {
        barChart: [
          "barColor",
          "barMargin",
          "chartHeight",
          "chartWidth",
          "chartBGColor",
          "chartTitle",
          "xTitle",
          "yTitle",
        ]
      },
      chartTitle: { value: "Name", type: "text" },
      chartHeight: { value: 500, type: "number" },
      chartWidth: { value: 700, type: "number" },
      chartBGColor: { value: "#fff", type: "color" },
      xTitle: { value: "xTitle", type: "text" },
      yTitle: { value: "xTitle", type: "text" },
      barColor: { value: "#003078", type: "color" },
      barMargin: { value: 2, type: "number" }
    };
    this.handleChange = this.handleChange.bind(this);
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

  render() {
    const { graphs, type } = this.state;
    const optionsToPass = graphs[type].reduce((acc, option) => {
      acc[option] = this.state[option];
      return acc;
    }, {});
    return (
      <MainWrapper>
        <Navbar />
        <Title> D3 Simplifier </Title>
        <OptionsDisplay
          options={optionsToPass}
          handleChange={this.handleChange}
        />
        <ChartDisplay options={optionsToPass} data={this.state.data} />
        <Footer />
      </MainWrapper>
    );
  }
}

export default App;
