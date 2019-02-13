import React from "react";
import BarChart from "./BarChart.jsx";
import PieChart from "./PieChart.jsx";
import { ChartWrapper } from "./../Styles/styledComponents";
import LineChart from "./LineChart.jsx";

const ChartDisplay = props => {
  // allows to change the graph being displayed
  // based of the user choice
  const children = {
    BarChart: <BarChart {...props} />,
    PieChart: <PieChart {...props} />,
    LineChart: <LineChart {...props} />,
  }
  return (
    <ChartWrapper>
      {children[props.type]}
    </ChartWrapper>
  );
};

export default ChartDisplay;
