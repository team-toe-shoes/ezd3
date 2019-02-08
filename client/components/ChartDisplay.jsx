import React from 'react';
import BarChart from './BarChart.jsx';

const ChartDisplay = props => {
  return (
    <div>
      Chart display:
      <BarChart options={props.options} />
    </div>
  ) 
}

export default ChartDisplay;

