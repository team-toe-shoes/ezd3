import React from 'react';

const OptionDisplay = props => (
  <label>
    {props.name}
    <input 
      type={props.type}
      name={props.name}
      value={props.value}
      onChange={props.handleChange}
    />
  </label>
);

export default OptionDisplay;