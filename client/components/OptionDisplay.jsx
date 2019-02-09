import React from 'react';
import { LabelWrapper, Input } from "./../Styles/styledComponents";

const OptionDisplay = props => (
  <LabelWrapper>
    <label htmlFor={props.value}>{props.name}</label>
    <Input
      type={props.type}
      name={props.name}
      value={props.value}
      onChange={props.handleChange}
    />
  </LabelWrapper>
);

export default OptionDisplay;