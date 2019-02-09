import React from "react";
import { Component } from "react";
import * as d3 from "d3";

class BarChart extends Component {
  plotGraph() {
    //   chartTitle: { value: "Name", type: "text" },
    //   xTitle: { value: "xTitle", type: "text" },
    //   yTitle: { value: "xTitle", type: "text" },
    const dataset = [10, 16, 20, 15, 14, 7];
    const svgWidth = this.props.options.chartWidth.value;
    const svgHeight = this.props.options.chartHeight.value;
    const barPadding = this.props.options.barMargin.value;
    const barWidth = svgWidth / dataset.length;
    const barColor = this.props.options.barColor.value;
    const bgColor = this.props.options.chartBGColor.value;
    const margin = 20;

    const y = d3
      .scaleLinear()
      .domain([0, Math.max(...dataset)])
      .range([svgHeight, 0]);

    const x = d3
      .scaleBand()
      .domain(["A", "B", "C", "D", "E", "F"])
      .rangeRound([0, svgWidth])
      .padding(0);

    const chart = d3.select("svg#plot_cont");

    chart
      .style("background-color", bgColor)
      .attr("width", svgWidth + 2 * margin)
      .attr("height", svgHeight + 2 * margin)
      .append("g")
      .attr("transform", "translate(" + margin + "," + margin + ")")
      .selectAll("rect")
      .data(dataset)
      .enter()
      .append("rect")
      .attr("fill", barColor)
      .attr("width", barWidth - barPadding)
      .attr("height", function(d) {
        return svgHeight - y(d);
      })
      .attr("x", function(d, i) {
        return barWidth * i + parseInt(barPadding) / 2;
      })
      .attr("y", function(d) {
        return y(d);
      });

    const xAxis = d3.axisBottom(x);

    const yAxis = d3.axisLeft(y).ticks(5);

    chart
      .append("g")
      .attr(
        "transform",
        "translate(" + margin + "," + (svgHeight + margin) + ")"
      )
      .call(xAxis);

    chart
      .append("g")
      .attr("transform", "translate(" + margin + "," + margin + ")")
      .call(yAxis);
  }

  componentDidMount() {
    console.log("mount");
    this.plotGraph();
    this.updateCode(this.props.options);
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.codeText === this.props.codeText) {
      this.updateCode(nextProps.options);
      console.log('call');
      return true;
    } 
    return false;
  }

  updateCode(nextProps) {
    this.props.updateCodeText(`
      const dataset = [10, 16, 20, 15, 14, 7];
      const svgWidth = ${nextProps.chartWidth.value};
      const svgHeight = ${nextProps.chartHeight.value};
      const barPadding = ${nextProps.barMargin.value};
      const barWidth = ${nextProps.chartWidth.value};
      const barColor = ${nextProps.barColor.value};
      const bgColor = ${nextProps.chartBGColor.value};
      const margin = 20;

      const y = d3.scaleLinear()
        .domain([0, Math.max(...dataset)])
        .range([svgHeight, 0]);

      const x = d3.scaleBand()
        .domain(['A', 'B', 'C', 'D', 'E', 'F'])
        .rangeRound([0, svgWidth])
        .padding(0);

      const chart = d3.select('svg#plot_cont');

      chart
        .style("background-color", bgColor)
        .attr('width', svgWidth + 2 * margin)
        .attr('height', svgHeight + 2 * margin)
        .append('g')
          .attr('transform', 'translate(' + margin + ',' + margin + ')')
        .selectAll('rect')
        .data(dataset)
        .enter().append('rect')
        .attr('fill', barColor)
        .attr("width", barWidth - barPadding)
        .attr("height", function(d) { return svgHeight - y(d); })
        .attr("x", function(d, i) { return barWidth * i + parseInt(barPadding) / 2; })
        .attr("y", function(d) { return y(d); });
      
      const xAxis = d3.axisBottom(x);

      const yAxis = d3.axisLeft(y)
        .ticks(5);

      chart.append("g")
        .attr("transform", "translate(" + margin + "," + (svgHeight + margin) + ")")
        .call(xAxis);
      
      chart.append("g")
        .attr("transform", "translate(" + margin + "," + margin + ")")
        .call(yAxis);
    `);
  }

  componentDidUpdate() {
    document.querySelector("svg#plot_cont").innerHTML = "";
    this.plotGraph();
  }

  render() {
    return <svg id="plot_cont" />;
  }
}

export default BarChart;
