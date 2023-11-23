import { useState } from "react";
import * as d3 from "d3";
import { width } from "@mui/system";

const initializeDataSet = (data) => {
  const totalSlices = data.reduce((total, curSet) => total + curSet[1], 0);
  const getSlice = (quantity) => {
    return quantity / (360 / totalSlices);
  };
  const getColor = (idx) => (idx % 2 === 0 ? "black" : "red");
  return data.map((d, i) => ({ label: d[0], quantity: d[1], slice: getSlice(d[1]), fill: getColor(i) }));
};

const getRy = (factor, radius, angle) => {
  return Math.sin(angle) * radius;
};

const getRx = (angle, radius, ry) => {
  const hyp = 2 * Math.pow(radius, 2) - 2 * Math.pow(radius, 2) * Math.cos(angle);
  return Math.sqrt(Math.pow(hyp, 2) - Math.pow(ry, 2));
};

const getPathDirection = (start, factor, radius) => {
  const baseAngle = 360 / 100;
  const angle = baseAngle * factor;
  const ry = getRy(factor, radius, angle);
  const rx = getRx(angle, radius, ry);
  const x = start.x + rx;
  const y = start.y + ry;
  const pathD = `M ${start.x} ${start.y}, A ${rx} ${ry}, 0, 0, 0, ${x} ${y}, L ${x} ${start.y} Z`;
  return { pd: pathD, nextX: x, nextY: y };
};

const initializePathD = (start, dataSet, radius) => {
  let curX = start.x;
  let curY = start.y;
  return dataSet.map((d) => {
    const { pd, nextX, nextY } = getPathDirection({ x: curX, y: curY }, d.quantity, radius);
    curX = nextX;
    curY = nextY;
    return { pd: pd, fill: d.fill };
  });
};

const PieChart = (props) => {
  const { chartData, height, width, radius } = props;
  const [dataSet, setDataSet] = useState(initializeDataSet(chartData));
  //   const start = { x: window.innerWidth / 2 - radius, y: window.innerHeight / 2 - radius };
  const start = { x: 80, y: 80 };

  console.log(dataSet);

  const [pathD, setPathD] = useState(initializePathD(start, dataSet, radius));

  return (
    <svg height={height} width={width}>
      <g id="arcs" fill="none">
        {pathD.map((pd) => (
          <path d={pd.pd} strokeWidth={1} fill={pd.fill} />
        ))}
        {/* {<path d={pathD[0].pd} fill={pathD[0].fill} strokeWidth={1} />} */}
      </g>
    </svg>
  );
};

export default PieChart;
