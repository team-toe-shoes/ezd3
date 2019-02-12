import React, { Component } from 'react';
import DataForm from './DataForm.jsx';

class DataForms extends Component {
  constructor(props) {
    super(props)

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
        {curDataForms}
        <input type="text" name="xInput" onChange={this.props.handleDataInput} />
        <input type="number" name="yInput" onChange={this.props.handleDataInput} />
        <button onClick={this.props.handleOnClick}>Add To Chart</button>
      </div>
    )
  }
}

export default DataForms;
