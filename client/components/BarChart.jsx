import Chart from '../classes/Chart';
import * as d3 from 'd3';

class BarChart extends Chart {
  plotGraph() {
    const xData = [];
    const yData = [];

    // populates the yData and xData arrays
    for (const dataPair of this.props.data) {
      xData.push(dataPair.name);
      yData.push(dataPair.value);
    }

    const svgWidth = this.props.options.chartWidth.value;
    const svgHeight = this.props.options.chartHeight.value;
    const barPadding = this.props.options.barMargin.value;
    const barColor = this.props.options.barColor.value;
    const bgColor = this.props.options.chartBGColor.value;
    const chartName = this.props.options.chartTitle.value;
    const yTitle = this.props.options.yTitle.value;
    const xTitle = this.props.options.xTitle.value;
    const barWidth = svgWidth / yData.length;
    const margin = 40;
    const transition = this.props.options.transition.value;

    // Creates a linear scale for the y-axis. The domain represents the values
    // on the scale. The range, the height of the y-axis on the svg element.
    const y = d3
      .scaleLinear()
      .domain([0, Math.max(...yData)])
      .range([svgHeight, 0]);

    // For the x-axis, we have a discrete distribution, so we
    // need to use the .scaleBand() method.
    const x = d3
      .scaleBand()
      .domain(xData)
      .rangeRound([0, svgWidth])
      .padding(0);

    const chart = d3.select('svg#plot_cont');

    // We style the <svg> element, as well as all the <rect>
    // created that represent the bars in our graph
    chart
      .style('background-color', bgColor)
      .attr('width', svgWidth + 2 * margin)
      .attr('height', svgHeight + 2 * margin)
      .append('g')
      .attr('transform', `translate(${margin},${margin})`)
      .selectAll('rect')
      .data(yData)
      .enter()
      .append('rect')
      .attr('fill', barColor)
      .attr('width', barWidth - barPadding)
      .attr('height', d => svgHeight - y(d))
      .attr('x', (d, i) => barWidth * i + parseInt(barPadding) / 2)
      .attr('y', d => y(d));

    // creates and style the x and y axis.
    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y).ticks(5);

    // the .attr() call creates the axis, while the .call()
    // creates the ticks.
    chart
      .append('g')
      .attr('transform', `translate(${margin},${svgHeight + margin})`)
      .call(xAxis);

    chart
      .append('g')
      .attr('transform', `translate(${margin},${margin})`)
      .call(yAxis);

    // adding text label & stlying for Chart Name
    chart
      .append('text')
      .attr(
        'transform',
        'translate(' +
          (svgWidth / 2 + margin) +
          ',' +
          (Math.max(...yData) - margin) +
          ')'
      )
      .style('font-size', '1.5em')
      .style('font-weight', 'bold')
      .style('text-anchor', 'middle')
      .text(chartName);

    // text label & styling for the x axis
    chart
      .append('text')
      .attr('x', svgWidth / 2 + margin / 2)
      .attr('y', svgHeight + margin + margin / 2)
      .attr('dy', '1em')
      .style('font-size', '1em')
      .style('font-weight', 'bold')
      .style('text-anchor', 'middle')
      .text(xTitle);

    // text label & styling for the y axis
    chart
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -svgHeight / 2 - margin)
      .attr('y', -5)
      .attr('dy', '1em')
      .style('font-size', '1em')
      .style('font-weight', 'bold')
      .style('text-anchor', 'middle')
      .text(yTitle);

    if (transition === 'true') {
      d3.selectAll('rect')
        .on('mouseover', function(d, i) {
          d3.select(this)
            .transition()
            .duration(200)
            .style('opacity', 0.7)
            .style('fill', '#f93');
        })
        .on('mouseout', function(d, i) {
          d3.select(this)
            .transition()
            .duration(200)
            .style('opacity', 1);
        });
    }
  }

  updateCode(nextProps) {
    this.props.updateCodeText(`
      // Define basic graph properties
      const xData = [20, 70, 5, 30];
      const yData = ${nextProps.Y_Values.value};
      const svgWidth = ${nextProps.chartWidth.value};
      const svgHeight = ${nextProps.chartHeight.value};
      const barPadding = ${nextProps.barMargin.value};
      const barColor = ${nextProps.barColor.value};
      const bgColor = ${nextProps.chartBGColor.value};
      const chartName = ${nextProps.chartTitle.value};
      const yTitle = ${nextProps.yTitle.value};
      const xTitle = ${nextProps.xTitle.value};
      const barWidth = ${nextProps.chartWidth.value / 4};
      const margin = 40;

      // Creates a linear scale for the y-axis. The domain represents the values
      // on the scale. The range, the height of the y-axis on the svg element.
      const y = d3
        .scaleLinear()
        .domain([0, Math.max(...yData)])
        .range([svgHeight, 0]);

      // For the x-axis, we have a discrete distribution, so we
      // need to use the .scaleBand() method.
      const x = d3
        .scaleBand()
        .domain(xData)
        .rangeRound([0, svgWidth])
        .padding(0);

      // 'svg#plot_cont' is the CSS-selector for the element we
      // want to plot the graph in.
      const chart = d3.select('svg#plot_cont');

      chart
        // styles the svg component
        .style("background-color", bgColor)
        .attr('width', svgWidth + 2 * margin)
        .attr('height', svgHeight + 2 * margin)

        // create a <g> element which the plot is gonna be
        // drawn inside of
        .append('g')
          .attr('transform', 'translate(' + margin + ',' + margin + ')')

        // select all <rect> inside of that <g> we just created.
        // ps: there are none!
        .selectAll('rect')
        .data(dataset)

        // we append and style one <rect> for each value in our dataset.
        .enter().append('rect')
        .attr('fill', barColor)
        .attr("width", barWidth - barPadding)
        .attr("height", function(d) { return svgHeight - y(d); })
        .attr("x", function(d, i) { return barWidth * i + parseInt(barPadding) / 2; })
        .attr("y", function(d) { return y(d); });

      // creates and style the x and y axis.
      const xAxis = d3.axisBottom(x);
      const yAxis = d3.axisLeft(y).ticks(5);

      chart.append("g")
        .attr("transform", "translate(" + margin + "," + (svgHeight + margin) + ")")
        .call(xAxis);

      chart.append("g")
        .attr("transform", "translate(" + margin + "," + margin + ")")
        .call(yAxis);

      // adding text label & stlying for Chart Name
      chart
        .append('text')
        .attr(
          'transform',
          'translate(' + (svgWidth / 2 + margin) + ',' + (Math.max(...yData) - margin) + ')'
        )
        .style('font-size', '1.5em')
        .style('font-weight', 'bold')
        .style('text-anchor', 'middle')
        .text(chartName);

      // text label & styling for the x axis
      chart
        .append('text')
        .attr('x', svgWidth / 2 + margin / 2)
        .attr('y', svgHeight + margin + margin / 2)
        .attr('dy', '1em')
        .style('font-size', '1em')
        .style('font-weight', 'bold')
        .style('text-anchor', 'middle')
        .text(xTitle);

      // text label & styling for the y axis
      chart
        .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('x', -svgHeight / 2 - margin)
        .attr('y', -5)
        .attr('dy', '1em')
        .style('font-size', '1em')
        .style('font-weight', 'bold')
        .style('text-anchor', 'middle')
        .text(yTitle);
    `);
  }
}

export default BarChart;
