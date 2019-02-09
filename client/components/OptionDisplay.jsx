import React from 'react';
import { LabelWrapper, Input } from "./../Styles/styledComponents";

const OptionDisplay = props => {
  // beautify the display of the option
  const optionName = props.name
    .replace("barColor", "Bar Color")
    .replace("barMargin", "Bar Margin")
    .replace("chartHeight", "Chart Height")
    .replace("chartWidth", "Chart Width")
    .replace("chartBGColor", "Background")
    .replace("chartTitle", "Chart Title");

  return (
    <LabelWrapper>
      <label htmlFor={props.value}>{optionName}</label>
      <Input
        type={props.type}
        name={props.name}
        value={props.value}
        onChange={props.handleChange}
      />
    </LabelWrapper>
  );
}

export default OptionDisplay;