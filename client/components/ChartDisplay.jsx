import React from "react";
import BarChart from "./BarChart.jsx";

const ChartDisplay = props => {
  return (
    <div>
      Chart display:
      <BarChart options={props.options} data={props.data} 
        updateCodeText={props.updateCodeText} codeText={props.codeText} />
    </div>
  );
};

export default ChartDisplay;
