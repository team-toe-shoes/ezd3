import React, { Component } from 'react';
import { MainWrapper, Title, GraphAndOptionsWrapper } from './../Styles/styledComponents';
import OptionsDisplay from './OptionsDisplay.jsx';
import ChartDisplay from './ChartDisplay.jsx';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import CodeDisplay from './CodeDisplay.jsx';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [
        {Q1: 20},
        {Q2: 70},
        {Q3: 5},
        {Q4: 30},
      ],
      codeText: '',
      type: 'barChart',
      graphs: {
        barChart: [
          'barColor',
          'barMargin',
          'chartHeight',
          'chartWidth',
          'chartBGColor',
          'chartTitle',
          'xTitle',
          'yTitle',
        ],
      },
      chartTitle: { value: 'Name', type: 'text' },
      chartHeight: { value: 300, type: 'number' },
      chartWidth: { value: 450, type: 'number' },
      chartBGColor: { value: '#fbfbfb', type: 'color' },
      xTitle: { value: 'Quartiles', type: 'text' },
      yTitle: { value: 'Rainfall (cm)', type: 'text' },
      barColor: { value: '#7e8471', type: 'color' },
      barMargin: { value: 2, type: 'number' },
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
      [name]: newObj,
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
        <Navbar />
        <Title> D3 Simplifier </Title>
        <GraphAndOptionsWrapper>
          <OptionsDisplay options={optionsToPass} handleChange={this.handleChange} />
          <ChartDisplay
            options={optionsToPass}
            data={this.state.data}
            updateCodeText={this.updateCodeText}
            codeText={this.state.codeText}
          />
        </GraphAndOptionsWrapper>

        <CodeDisplay codeText={this.state.codeText} />
        <Footer />
      </MainWrapper>
    );
  }
}

export default App;
