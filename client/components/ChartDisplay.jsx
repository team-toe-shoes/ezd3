import React from "react";
import BarChart from "./BarChart.jsx";
import { ChartWrapper} from "./../Styles/styledComponents";

const ChartDisplay = props => {
  return (
    <ChartWrapper>
      <BarChart options={props.options} data={props.data} />
    </ChartWrapper>
  );
};

export default ChartDisplay;
