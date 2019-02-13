
import React from "react";
import BarChart from "./BarChart.jsx";
import PieChart from "./PieChart.jsx";
import { ChartWrapper } from "./../Styles/styledComponents";
import LineChart from "./LineChart.jsx";
import RadarChart from './RadarChart.jsx';
import PieChartHooks from './PieChartHooks.jsx';

const ChartDisplay = props => {
  // allows to change the graph being displayed
  // based of the user choice
  const children = {
    BarChart: <BarChart {...props} />,
    PieChart: <PieChart {...props} />,
    LineChart: <LineChart {...props} />,
    RadarChart: <RadarChart {...props} />
  };
  return <ChartWrapper>{children[props.type]}</ChartWrapper>;
    PieChartHooks: <PieChartHooks {...props} />

  }
  return (
    <ChartWrapper>
      {children[props.type]}
    </ChartWrapper>
  );
};

export default ChartDisplay;
