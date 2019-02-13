import React, { Component } from 'react';
import DataForm from './DataForm.jsx';

class DataForms extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }

    this.handleDataInput = this.handleDataInput.bind(this);
  }

  handleDataInput(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }

  render() {

    const curDataForms = [];

    this.props.data.forEach((ele) => {
      const { name, value } = ele;
      curDataForms.push(
        <DataForm value={value} name={name} key={name} deleteColumn={this.props.deleteColumn} />
      )
    })

    return (
      <div>
        <button name="LineChart" onClick={(e) => this.props.changeType(e)}>LineChart</button>
        <button name="PieChart" onClick={(e) => this.props.changeType(e)}>PieChart</button>
        <button name="PieChartHooks" onClick={(e) => this.props.changeType(e)}>PieChartHooks</button>
        <button name="TreeMap" onClick={(e) => this.props.changeType(e)}>TreeMap</button>
        {curDataForms}
        <input type="text" name="xInput" onChange={this.handleDataInput} />
        <input type="number" name="yInput" onChange={this.handleDataInput} />
        <button onClick={() =>  this.props.handleOnClick(this.state) }>Add To Chart</button>

      </div>
    )
  }
}

export default DataForms;
