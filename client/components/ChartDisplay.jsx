import React from "react";
import BarChart from "./BarChart.jsx";
import { ChartWrapper} from "./../Styles/styledComponents";

const ChartDisplay = props => {
  return (
    <ChartWrapper>
      Chart display:
      <BarChart options={props.options} data={props.data} 
        updateCodeText={props.updateCodeText} codeText={props.codeText} />
    </ChartWrapper>
  );
};

export default ChartDisplay;
