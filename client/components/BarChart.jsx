import React from "react";
import { Component } from "react";
import * as d3 from "d3";

class BarChart extends Component {
  plotGraph() {
    const dataset = this.props.data;
    const svgWidth = this.props.options.chartWidth.value;
    const svgHeight = this.props.options.chartHeight.value;
    const barPadding = this.props.options.barMargin.value;
    const barWidth = svgWidth / dataset.length;

    let svg = d3
      .select("svg#plot_cont")
      .attr("width", svgWidth)
      .attr("height", svgHeight)
      .style("background-color", this.props.options.chartBGColor.value);
    //   chartTitle: { value: "Name", type: "text" },

    //   xTitle: { value: "xTitle", type: "text" },
    //   yTitle: { value: "xTitle", type: "text" },

    let barChart = svg
      .selectAll("rect")
      .data(dataset)
      .enter()
      .append("rect")
      .attr("y", function(d) {
        return svgHeight - d;
      })
      .attr("height", function(d) {
        return d;
      })
      .attr("fill", this.props.options.barColor.value)
      .attr("width", barWidth - barPadding)
      .attr("transform", function(d, i) {
        let translate = [barWidth * i, 0];
        return "translate(" + translate + ")";
      });
  }

  componentDidMount() {
    console.log("TEST");
    this.plotGraph();
  }

  render() {
    return <svg id="plot_cont" />;
  }
}

export default BarChart;
