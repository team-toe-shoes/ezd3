// import * as d3 from 'd3';

// import Chart from '../classes/Chart.js';

// class RadarChart extends Chart {
//   plotGraph() {
//     const data = this.props.data;

//     const xData = [];
//     const yData = [];

//     // populates the yData and xData arrays
//     for (const dataPair of data) {
//       xData.push(dataPair.name);
//       yData.push(dataPair.value);
//     }

//     const beforeWidth = this.props.options.chartWidth.value;
//     const beforeHeight = this.props.options.chartHeight.value;
//     const marginT = this.props.options.radial_top_margin.value;
//     const marginB = this.props.options.radial_bottom_margin.value;
//     const marginL = this.props.options.radial_left_margin.value;
//     const marginR = this.props.options.radial_right_margin.value;
//     const margin = 40;
//     // const transition = this.props.options.transition.value;
//     const barWidth = width / yData.length;
//     const barPadding = this.props.options.barMargin.value;
//     const barColor = this.props.options.barColor.value;
//     const bgColor = this.props.options.chartBGColor.value;
//     // const chartName = this.props.options.chartTitle.value;
//     // const yTitle = this.props.options.yTitle.value;
//     // const xTitle = this.props.options.xTitle.value;

//     let width = beforeWidth - marginL - marginR;
//     let height = beforeHeight - marginT - marginB;

//     // let maxValue;
//     // maxValue = data[0].value;
//     // for (let i = 0; i > data.length; i++) {
//     //   if (maxValue < data[i].value) {
//     //     maxValue = data[i].value;
//     //   }
//     // }

//     const y = d3
//       .scaleLinear()
//       .domain([0, Math.max(...yData)])
//       .range([height, 0]);

//     const x = d3
//       .scaleBand()
//       .domain(xData)
//       .rangeRound([0, width])
//       .padding(0);

//     let chart = d3.select('svg#plot_cont');

//     chart
//       .style('background-color', bgColor)
//       .attr('width', beforeWidth)
//       .attr('height', beforeHeight)
//       .append('g')
//       .attr('transform', 'translate(' + marginL + ',' + marginT + ')')
//       .selectAll('rect')
//       .data(yData)
//       .enter()
//       .append('rect')
//       .attr('fill', barColor)
//       .attr('width', barWidth - barPadding)
//       .attr('height', d => height - y(d))
//       .attr('x', (d, i) => barWidth * i + parseInt(barPadding) / 2)
//       .attr('y', d => y(d))
//       .attr(
//         'd',
//         d3
//           .line()
//           .x(function(d) {
//             return x(d.date);
//           })
//           .y(function(d) {
//             return y(d.value);
//           })
//       );

//     const xAxis = d3.axisBottom(x);
//     const yAxis = d3.axisLeft(y).ticks(5);

//     chart
//       .append('g')
//       .attr('transform', `translate(${margin},${height + margin})`)
//       .call(xAxis);

//     chart
//       .append('g')
//       .attr('transform', `translate(${margin},${margin})`)
//       .call(yAxis);

//     // Add the points
//     chart
//       .append('g')
//       .selectAll('dot')
//       .data(yData)
//       .enter()
//       .append('circle')
//       .attr('cx', function(d) {
//         return x(d.name);
//       })
//       .attr('cy', function(d) {
//         return y(d.value);
//       })
//       .attr('r', 5)
//       .attr('fill', '#69b3a2');
//   }
//   updateCode(nextProps) {
//     this.props.updateCodeText(`
//           `);
//   }
// }

// //

// export default RadarChart;
