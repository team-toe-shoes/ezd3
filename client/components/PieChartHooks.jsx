import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const PieChartHooks = props => {

  const ref = useRef(null);
  const createPie = d3
    .pie()
    .value(d => d.value)
    .sort(null);
  const createArc = d3
    .arc()
    .innerRadius(props.options.innerRadius.value)
    .outerRadius(props.options.outerRadius.value);
  const colors = d3.scaleOrdinal(d3.schemeCategory10);
  const format = d3.format(".2f");

  useEffect(
    () => {
      const newData = createPie(props.data);
      const group = d3.select(ref.current);
      const groupWithData = group.selectAll("g.arc").data(newData);

      groupWithData.exit().remove();

      const groupWithUpdate = groupWithData
        .enter()
        .append("g")
        .attr("class", "arc");

      const path = groupWithUpdate
        .append("path")
        .merge(groupWithData.select("path.arc"));

      path
        .attr("class", "arc")
        .attr("d", createArc)
        .attr("fill", (d, i) => colors(i));

      const text = groupWithUpdate
        .append("text")
        .merge(groupWithData.select("text"));

      text
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .attr("transform", (d) => `translate(${createArc.centroid(d)})`)
        .style("fill", "white")
        .style("font-size", 10)
        .text(d => format(d.value));

      props.updateCodeText(`
      const width = ${props.options.chartWidth.value};
      const height = ${props.options.chartHeight.value};

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
        .attr("transform", translate(\${width / 2},\${height / 2}));

      g.selectAll("path")
        .data(arcs)
        .enter().append("path")
        .attr("fill", d => color(d.data.name))
        .attr("stroke", "white")
        .attr("d", arc)
        .append("title")
        .text(d => \`\${d.data.name}: \${d.data.value.toLocaleString()}\`);

      const text = g.selectAll("text")
        .data(arcs)
        .enter().append("text")
        .attr("transform", d => \`translate(\${arcLabel().centroid(d)})\`)
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
    `);

    },
    [props.data]
  );

  return (
    <div>
      <svg width={props.options.chartWidth.value} height={props.options.chartHeight.value} textAnchor="middle">
        <g
          ref={ref}
          transform={`translate(${props.options.outerRadius.value} ${props.options.outerRadius.value})`}
        />
      </svg>
    </div>

  );
};

export default PieChartHooks;
