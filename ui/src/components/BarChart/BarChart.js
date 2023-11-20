import React, { Fragment, useEffect } from "react";
import { useState } from "react";
import { styled, Grid } from "@mui/material";
import CurvedArrowLine from "../../ui_components/CurveArrowedLine";
import * as d3 from "d3";

// import rd3 from "react-d3-library";
import "./BarChart.css";
// import { Square, YouTube } from "@mui/icons-material";
// const RD3Component = rd3.Component;

const PreferencesComponent = styled(Grid)({
  container: true,
  height: "500px",
  width: "200px",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
});

const BarChart = (props) => {
  const { data, color, height, width } = props;

  const barWidth = 25;
  const chartWidth = data.length * (barWidth + 5);
  const xScale = d3.scaleLinear().domain([0, data.length]).range([0, chartWidth]);
  const yScale = (d) => 10 * d;
  const xOffset = window.innerWidth / 2 - chartWidth / 2;
  const maxHeight = yScale(data[0][1]);

  return (
    <Fragment>
      <svg height={height} width={width}>
        {data.map((d, idx) => {
          const barHeight = yScale(d[1]);
          const x = xScale(idx) + xOffset;
          const y = maxHeight - barHeight;
          const arrowSrc = y + barHeight;
          const arrowDest = y + barHeight + 100;
          return (
            <Fragment>
              <g key={idx} width={barWidth} transform={`translate(${x}, ${0})`}>
                <rect width={barWidth} height={y} fill={"white"} />
                <rect width={barWidth} transform={`translate(${0}, ${y})`} height={barHeight} fill={color} />
              </g>
              <CurvedArrowLine
                // visible={visible}
                // onClick={handleSetVisible}
                start={{ x, y: arrowSrc }}
                stop={{ x: x - 100, y: arrowDest }}
              />
            </Fragment>
          );
        })}
      </svg>
      {/* <PopupComponent open={popup} setOpen={setPopup} content={popupContent} coordinates={popupContentCoordinates} /> */}
    </Fragment>
  );
};

export default BarChart;
