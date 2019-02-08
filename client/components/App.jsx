import React, { Component } from 'react';
import OptionsDisplay from './OptionsDisplay.jsx';
// import ChartDisplay from "./ChartDisplay.jsx";

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
          "barThickness",
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
      barMargin: { value: 2, type: "number" },
      barThickness: { value: 20, type: "number" }
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    console.log('in handle change:', e);
    const { name, value } = e.target;
    const newObj = Object.assign({}, this.state[name]);
    newObj.value = value;
    this.setState({
      [name]: newObj,
    });
  }

    render() {
      const { graphs, type } = this.state;
      const optionsToPass = graphs[type].reduce( (acc, option) => {
        acc[option] = this.state[option];
        return acc;
      }, {})
      return (
        <div>
          <div> Hello World! </div>
          <OptionsDisplay
            options={optionsToPass}
            handleChange={this.handleChange}
          />
          <ChartDisplay options={optionsToPass} />
        </div>
      );
    }
  
}

export default App;
 'barColor', 'barMargin', 'barThickness', 'chartHeight', 'chartWidth', 'chartBGColor', 'xTitle', 'yTitle', 'chartTitle'
