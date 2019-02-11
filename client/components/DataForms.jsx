import React, { Component } from 'react';

class DataForms extends Component {
  constructor(props) {
    super(props)

    // this.state = {
    //   inputData: [],
    //   xInput: '',
    //   yInput: null
    // }

    // this.handleChange = this.handleChange.bind(this);
    // this.handleClick = this.handleClick.bind(this);
  }

  // handleChange(e) {
  //   const { name, value } = e.target;
  //   this.setState({
  //     [name]: value
  //   })
  // }

  // handleClick() {
  //   const newXY = {
  //     xInput: this.state.xInput,
  //     yInput: this.state.yInput
  //   };
  //   this.setState({
  //     inputData: [...this.state.inputData, newXY]
  //   })
  // }

  render() {
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
