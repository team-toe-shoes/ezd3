import React from "react";
import BarChart from "./BarChart.jsx";
import PieChart from "./PieChart.jsx";
import PieChartHooks from './PieChartHooks.jsx';
import { ChartWrapper} from "./../Styles/styledComponents";

const ChartDisplay = props => {
  // allows to change the graph being displayed
  // based of the user choice
  const children = {
    BarChart: <BarChart {...props} />,
    PieChart: <PieChart {...props} />,
    PieChartHooks: <PieChartHooks {...props} />
  }
  return (
    <ChartWrapper>
      {children[props.type]}
    </ChartWrapper>
  );
};

export default ChartDisplay;
