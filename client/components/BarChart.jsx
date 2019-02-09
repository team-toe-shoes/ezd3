import React from 'react';
import { Component } from 'react';
import * as d3 from 'd3';

class BarChart extends Component {
  constructor() {
    super();
    this.debouncerTracker = 0;
  }

  plotGraph() {
    const xData = [];
    const yData = [];

    // populates the yData and xData arrays
    for (let dataPair of this.props.data) {
      const xValue = Object.keys(dataPair)[0];
      const yValue = dataPair[xValue];
      xData.push(xValue);
      yData.push(yValue);
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
      .attr('transform', 'translate(' + margin + ',' + margin + ')')
      .selectAll('rect')
      .data(yData)
      .enter()
      .append('rect')
      .attr('fill', barColor)
      .attr('width', barWidth - barPadding)
      .attr('height', function(d) {
        return svgHeight - y(d);
      })
      .attr('x', function(d, i) {
        return barWidth * i + parseInt(barPadding) / 2;
      })
      .attr('y', function(d) {
        return y(d);
      });
    
    // creates and style the x and y axis.  
    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y).ticks(5);

    // the .attr() call creates the axis, while the .call() 
    // creates the ticks.
    chart
      .append('g')
      .attr('transform', 'translate(' + margin + ',' + (svgHeight + margin) + ')')
      .call(xAxis);

    chart
      .append('g')
      .attr('transform', 'translate(' + margin + ',' + margin + ')')
      .call(yAxis);

    // adding text label for Chart Name
    chart
      .append('text')
      .attr(
        'transform',
        'translate(' + (svgWidth / 2 - margin) + ',' + (Math.max(...yData) + margin) + ')',
      )
      .style('text-anchor', 'middle')
      .text(chartName);

    // text label for the x axis
    chart
      .append('text')
      .attr('y', +svgHeight + margin + 20)
      .attr('x', +svgWidth / 2)
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .text(xTitle);

    // text label for the y axis
    chart
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0)
      .attr('x', -svgHeight / 2 - margin)
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .text(yTitle);
  }

  updateCode(nextProps) {
    this.props.updateCodeText(`
      // Define basic graph properties 
      const xData = [20, 70, 5, 30];
      const yData = ['Q1', 'Q2', 'Q3', 'Q4'];
      const svgWidth = ${nextProps.options.chartWidth.value};
      const svgHeight = ${nextProps.options.chartHeight.value};
      const barPadding = ${nextProps.options.barMargin.value};
      const barColor = ${nextProps.options.barColor.value};
      const bgColor = ${nextProps.options.chartBGColor.value};
      const chartName = ${nextProps.options.chartTitle.value};
      const yTitle = ${nextProps.options.yTitle.value};
      const xTitle = ${nextProps.options.xTitle.value};
      const barWidth = ${nextProps.options.chartWidth.value / 4};
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
    `);
  }

  componentDidUpdate() {
    // everytime the component updates, we replot the graph.
    document.querySelector('svg#plot_cont').innerHTML = '';
    this.plotGraph();
  }

  componentDidMount() {
    this.plotGraph();
    this.updateCode(this.props);
  }

  shouldComponentUpdate(nextProps) {
     /*
     * We need to manually decide wether or not the component should
     * re-render. Everytime a prop that relates to the graph changes,
     * we need to replot the graph. There are two problems:
     * 
     * 1) Every time we update the graph, we change a prop that represents
     * the code related with the graph being displayed on page. This would
     * trigger another re-render, so we need to tell the component NOT
     * to re-render if what fired it was a change to the codeText prop.
     * 
     * 2) When the user clicks and drags on the color picker, it changes
     * the props many times. This calls the plotGraph function too
     * frequently, so we need to debounce it so it only gets called, at
     * max, once every 100ms.
     */
    if (Date.now() - this.debouncerTracker < 100) return false;
    this.debouncerTracker = Date.now();

    if (nextProps.codeText === this.props.codeText) {
      this.updateCode(nextProps);
      return true;
    } 
    return false;
  }

  render() {
    return <svg id="plot_cont" />;
  }
}

export default BarChart;
