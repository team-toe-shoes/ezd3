import React, { Component } from 'react';
import * as d3 from 'd3';
import Chart from './../classes/Chart';

class PieChart extends Chart {
  plotGraph() {
    const width = this.props.options.chartWidth.value;
    const height = this.props.options.chartHeight.value;
    const barColor = this.props.options.barColor.value;

    const arc = d3.arc()
      .innerRadius(0)
      .outerRadius(Math.min(width, height) / 2 - 1);

    const pie = d3.pie()
      .sort(null)
      .value(d => d.value);

    const arcLabel = () => {
      const radius = Math.min(width, height) / 2 * 0.8;
      return d3.arc().innerRadius(radius).outerRadius(radius);
    };
    
    const arcs = pie(this.props.data);

    const color = d3.scaleOrdinal()
      .domain(this.props.data.map(d => d.name))
      .range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), this.props.data.length).reverse())
      
    const svg = 
      d3.select('svg#plot_cont')
        .attr("width", width)
        .attr("height", height)
        .attr("text-anchor", "middle")
        .style("font", "12px sans-serif");
    
    const g = 
      svg.append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    g.selectAll("path")
      .data(arcs)
      .enter().append("path")
      .attr("fill", d => color(d.data.name)) 
      // .attr("fill", barColor)
      .attr("stroke", "white")
      .attr("d", arc)
      .append("title")
      .text(d => `${d.data.name}: ${d.data.value.toLocaleString()}`);

    const text = g.selectAll("text")
      .data(arcs)
      .enter().append("text")
      .attr("transform", d => `translate(${arcLabel().centroid(d)})`)
      .attr("dy", "0.35em");

    text.append("tspan")
      .attr("x", 0)
      .attr("y", "-0.7em")
      .style("font-weight", "bold")
      .text(d => d.data.name);

    text.filter(d => (d.endAngle - d.startAngle) > 0.25).append("tspan")
      .attr("x", 0)
      .attr("y", "0.7em")
      .attr("fill-opacity", 0.7)
      .text(d => d.data.value.toLocaleString());
  }
}

export default PieChart;