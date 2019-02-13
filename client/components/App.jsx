import React, { Component } from 'react';
import DataForms from './DataForms.jsx';
import TreeMap from './TreeMap.jsx';

//import styled components
import {
  MainWrapper,
  Title,
  GraphAndOptionsWrapper
} from './../Styles/styledComponents';

//import components to render
import OptionsDisplay from './OptionsDisplay.jsx';
import ChartDisplay from './ChartDisplay.jsx';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import CodeDisplay from './CodeDisplay.jsx';

//The only stateful component
class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [
        { name: 'Q1', value: 20 },
        { name: 'Q2', value: 70 },
        { name: 'Q3', value: 5 },
        { name: 'Q4', value: 30 },
        { name: 'Q5', value: 50 },
        { name: 'Q6', value: 20 },
        { name: 'Q7', value: 70 },
        { name: 'Q8', value: 60 },
        { name: 'Q9', value: 80 }
      ],
      // will be modified to reflect the code used to build the graph
      codeText: '',

      // reflect the type of graph chosen by user
      // defaulted to Bar Chart

      type: 'LineChart',


      // options that can be modified by user for each type
      // of graphs available in the app
      graphs: {
        BarChart: [
          'barColor',
          'barMargin',
          'chartHeight',
          'chartWidth',
          'chartBGColor',
          'chartTitle',
          'yTitle',
          'xTitle',
          'transition',
          'Y_Values'
        ],

        PieChart: ['chartWidth', 'chartHeight', 'chartTitle'],
        LineChart: [
          'barColor',
          'barMargin',
          'chartHeight',
          'chartWidth',
          'chartBGColor',
          'chartTitle',
          'yTitle',
          'xTitle',
          'transition',
          'Y_Values'
        ],
        RadarChart: [
          'chartTitle',
          'barColor',
          'barMargin',
          'chartBGColor',
          'chartWidth',
          'chartHeight',
          'radial_top_margin',
          'radial_left_margin',
          'radial_bottom_margin',
          'radial_right_margin',
          'factor',
          'factorLegend',
          'levels',
          'opacityArea'
        ],

        PieChartHooks: ['chartWidth', 'chartHeight', 'innerRadius', 'outerRadius'],
        TreeMap: ['chartWidth', 'chartHeight']
      },

      // all option options
      chartTitle: { value: 'Name', type: 'text' },
      chartHeight: { value: 330, type: 'number' },
      chartWidth: { value: 650, type: 'number' },
      chartBGColor: { value: '#fbfbfb', type: 'color' },
      xTitle: { value: 'Quartiles', type: 'text' },
      yTitle: { value: 'Rainfall (cm)', type: 'text' },
      barColor: { value: '#7e8471', type: 'color' },
      barMargin: { value: 2, type: 'number' },
      radial_top_margin: { value: 20, type: 'number' },
      radial_left_margin: { value: 10, type: 'number' },
      radial_bottom_margin: { value: 20, type: 'number' },
      radial_right_margin: { value: 10, type: 'number' },
      transition: { value: 'false', type: 'checkbox' },

      factor: { value: 1, type: 'number' },
      factorLegend: { value: 0.85, type: 'number' },
      levels: { value: 3, type: 'number' },
      opacityArea: { value: 0.5, type: 'number' },
      Y_Values: { value: 'Array', type: 'text' },
      innerRadius: { value: 120, type: 'number' },
      outerRadius: { value: 150, type: 'number' }
    };

    // binding functions that are passed to children components
    this.handleChange = this.handleChange.bind(this);
    this.updateCodeText = this.updateCodeText.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.deleteColumn = this.deleteColumn.bind(this);
  }

  // handle user interaction with inputs
  handleChange(e) {
    let { name, type, value } = e.target;

    if (name === 'barMargin') {
      if (value < 0) {
        return;
      } else if (
        value >
        this.state.chartWidth.value / this.state.data.length - 1
      ) {
        return;
      }
    }
    if (name === 'transition') {
      if (value === 'false') {
        value = 'true';
      } else {
        value = 'false';
      }
    }
    // parses the inputs of type number to be stored as numbers (string by default)
    if (type === 'number') {
      value = Number(value);
    }
    const newObj = Object.assign({}, this.state[name]);
    newObj.value = value;

    // update the state for corresponding options
    this.setState({
      [name]: newObj
    });
  }

  updateCodeText(codeText) {
    this.setState({ codeText });
  }

  handleOnClick(newCol) {
    const newXY = {
      name: newCol.xInput,
      value: newCol.yInput
    };
    let curr_state = this.state.data;
    if (curr_state.some(el => el.name === newXY.name))
      alert('input key already exists');
    else {
      this.setState({
        data: [...this.state.data, newXY]
      });
    }
  }

  deleteColumn(e) {
    let curData = this.state.data;
    curData = curData.filter(ele => {
      return ele.name != e.target.name;
    });

    this.setState({
      data: curData
    });
  }

  render() {
    const { graphs, type, codeText, data } = this.state;

    // filter out the options to only pass the props that correspond
    // to a chosen graph
    const optionsToPass = graphs[type].reduce((acc, option) => {
      acc[option] = this.state[option];
      return acc;
    }, {});

    return (
      <MainWrapper>
        {/* Navbar to be developed */}
        <Navbar />
        <Title>D3 Simplifier</Title>
        <GraphAndOptionsWrapper>
          {/* Container that has each option as a child components */}
          <OptionsDisplay
            options={optionsToPass}
            handleChange={this.handleChange}
          />
          <ChartDisplay
            options={optionsToPass}
            data={data}
            updateCodeText={this.updateCodeText}
            codeText={codeText}
            type={type}
          />
        </GraphAndOptionsWrapper>

        <DataForms
          data={this.state.data}
          handleOnClick={this.handleOnClick}
          handleDataInput={this.handleDataInput}
          deleteColumn={this.deleteColumn}
        />
        <CodeDisplay codeText={codeText} />
        <Footer />
      </MainWrapper>
    );
  }
}

export default App;
