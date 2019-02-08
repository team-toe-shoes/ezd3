import React from 'react';
import OptionDisplay from './OptionDisplay.jsx';

const OptionsDisplay = props => {
  const options = Object.keys(props.options).map(option => (
    <OptionDisplay
      name={option}
      value={props.options[option].value}
      type={props.options[option].type}
      handleChange={props.handleChange}
    />
  ));

  return <div>Options Display{options}</div>
};

export default OptionsDisplay;