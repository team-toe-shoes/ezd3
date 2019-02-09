import React from "react";
import BarChart from "./BarChart.jsx";
import { ChartWrapper} from "./../Styles/styledComponents";

const ChartDisplay = props => {
  // allows to change the graph being displayed
  // based of the user choice
  return (
    <ChartWrapper>
      <BarChart options={props.options} data={props.data} 
        updateCodeText={props.updateCodeText} codeText={props.codeText} />
    </ChartWrapper>
  );
};

export default ChartDisplay;
