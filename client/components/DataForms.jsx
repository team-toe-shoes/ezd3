import React, { Component } from 'react';

class DataForms extends Component {
  constructor(props) {
    super(props)

  }

  render() {

    // const curData = [];

    // this.props.data.forEach((ele) => {
    //   console.log(ele)
    // })

    return (
      <div>
        <input type="text" name="xInput" onChange={this.props.handleDataInput} />
        <input type="number" name="yInput" onChange={this.props.handleDataInput} />
        <button onClick={this.props.handleOnClick}>Add To Chart</button>
      </div>
    )
  }
}

export default DataForms;
