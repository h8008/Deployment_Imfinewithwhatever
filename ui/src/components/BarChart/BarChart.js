import React, { Fragment } from "react";
import { useState, useEffect, useRef } from "react";
import { styled, Grid } from "@mui/material";
import attributes from "../../config/index";
import * as d3 from "d3";

import rd3 from "react-d3-library";
import "./BarChart.css";
import { Square, YouTube } from "@mui/icons-material";
const RD3Component = rd3.Component;

const PreferencesComponent = styled(Grid)({
  container: true,
  height: "500px",
  width: "200px",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
});

const useDrawChart = (props) => {
  const { id, data, color, pos, height, width } = props;
  const barWidth = 70;
  const chartWidth = data.length * barWidth;
  const xOffset = window.innerWidth / 2 - chartWidth / 2;
  const yOffset = pos;
  const [svg, setSvg] = useState(null);

  useEffect(() => {
    if (data != null) {
      // const xScale = d3.scaleLinear().domain([0, data.length]).range([0, width]);
      const xScale = (d) => 70;
      const yScale = (d) => 300 - 10 * d;
      // const svg = d3.select("body").append("svg").attr("width", width).attr("height", height);
      // svg
      //   .selectAll("rect")
      //   .data(data)
      //   .enter()
      //   .append("rect")
      //   .attr("x", (d, i) => i * barWidth + xOffset)
      //   .attr("y", (d, i) => 300 - 10 * d[1])
      //   .attr("width", 65)
      //   .attr("height", (d, i) => d[1] * 10)
      //   .attr("fill", color);
      const node = (
        <svg height={height} width={width} style={{ backgrondColor: "black" }}>
          {data.map((d, idx) => (
            <g key={idx} transform={`translate(${xScale(idx)}, ${50})`} style={{ width, height }} fill="red">
              {data}
            </g>
          ))}
        </svg>
      );
      setSvg(node);
    }
  }, [color, data, height, svg, width, xOffset, yOffset]);
  return [svg];
};

const BarChart = (props) => {
  const { id, data, color, pos, height, width } = props;

  const body = window.document.getElementsByTagName("canvas");
  const barWidth = 25;
  const chartWidth = data.length * (barWidth + 5);

  const xScale = d3.scaleLinear().domain([0, data.length]).range([0, chartWidth]);
  const yScale = (d) => 10 * d;
  const xOffset = window.innerWidth / 2 - chartWidth / 2;
  const maxHeight = yScale(data[0][1]);

  // console.log("data", data);
  // console.log("max height", maxHeight);

  return (
    // <PreferencesComponent>
    <svg height={height} width={width}>
      {data.map((d, idx) => {
        const barheight = yScale(d[1]);
        const yOffset = maxHeight - barheight;
        return (
          <g key={idx} width={barWidth} transform={`translate(${xScale(idx) + xOffset}, ${0})`}>
            <rect width={barWidth} height={yOffset} fill={"white"} />
            <rect width={barWidth} transform={`translate(${0}, ${yOffset})`} height={barheight} fill={color} />
          </g>
        );
      })}
    </svg>
    // </PreferencesComponent>
  );
};

export default BarChart;
