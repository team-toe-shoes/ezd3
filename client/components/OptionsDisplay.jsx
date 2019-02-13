import React from 'react';
import OptionDisplay from './OptionDisplay.jsx';
import { OptionsWrapper } from './../Styles/styledComponents';

const OptionsDisplay = props => {
  // iterate through the options passed in
  // and create a component to display each of them
  const options = Object.keys(props.options).map((option, i) => (
    <OptionDisplay
      name={option}
      value={props.options[option].value}
      type={props.options[option].type}
      handleChange={props.handleChange}
      key={i}
    />
  ));

  return <OptionsWrapper>{options}</OptionsWrapper>;
};

export default OptionsDisplay;
