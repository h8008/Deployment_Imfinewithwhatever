import { color } from "d3";
import { Fragment, useState, useRef, useEffect, forwardRef } from "react";
import { PieChart as PC } from "react-minimal-pie-chart";
import CurveArrowedLine from "../../../ui_components/CurveArrowedLine";
import { Grid } from "@mui/material";

const initializeData = (data, colors) => {
  return data.map((d, i) => ({ title: d[0], value: d[1], color: colors[d[1]] }));
};

const getColors = (data) => {
  const colors = {};
  data.forEach((d, i) => {
    if (colors[d[1]] == null) {
      const c = "#" + Math.random().toString(16).slice(-6);
      colors[d[1]] = c;
    }
  });

  return colors;
};

const classifyData = (data, slices) => {
  const dict = {};

  data.forEach((d, i) => {
    dict[d.value] = dict[d.value] == null ? [d] : [...dict[d.value], d];
  });

  const values = Object.fromEntries(
    Object.keys(dict).map((key, i) => {
      const value = key / slices;
      return [key, value];
    })
  );

  const classified = Object.keys(dict).map((key, i) => {
    const data = dict[key];
    return data.map((d, i) => ({ ...d, value: Math.floor(values[key] + 1) }));
  });

  const condensed = classified
    .map((data, i) => {
      if (data.length > 1) {
        return data.reduce(
          (acc, cur, i) =>
            i === 0 ? [...acc] : [{ title: acc[0].title + "," + cur.title, value: cur.value, color: cur.color }],
          [{ ...data[0] }]
        );
      }
      return data;
    })
    .reduce((acc, arr, i) => [...acc, ...arr], []);

  return condensed;
};

// const getTotalSlices = (data) => data.reduce((total, curSet) => total + curSet[1], 0);
const getTotalSlices = (data) => Array.from(new Set(data.map((d) => d[1])).values()).length;

const handleShowCategories = (e, segmentIdx, showTitle, setShowTitle, titleStartPos, setTitleStartPos) => {
  const newShowTile = [...showTitle];
  const newTitleStartPos = [...titleStartPos];
  newShowTile[segmentIdx] = true;
  newTitleStartPos[segmentIdx] = { x: e.clientX, y: e.clientY };
  setShowTitle(newShowTile);
  setTitleStartPos(newTitleStartPos);
};

const getCurvedLine = (visible, { x, y }, data, color) => {
  return <CurveArrowedLine visible={visible} start={x} stop={y} data={data} color={color} />;
};

const handleGetCenters = (e, segmentIdx, centers, setCenters) => {
  console.log("offset", { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });

  const center = { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY };
  const newCenters = [...centers];
  newCenters[segmentIdx] = center;
  setCenters(newCenters);
};

const getStop = (start, i, labelDirection) => {
  const adjustment = 20 * (i + 1);
  const x = labelDirection === "ltr" ? start.x + adjustment : start.x - adjustment;
  return i === 0 ? { x: x, y: start.y - 20 } : { x: x, y: start.y + 20 };
};

const pieChartContainerStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "center",
};

const PieChartComponent = forwardRef((props, ref) => {
  const { chartData, height, width, radius, transform, labelDirection } = props;
  // const ref = useRef(null);
  const [colors, setColors] = useState(getColors(chartData));
  const [slices, setSlices] = useState(getTotalSlices(chartData));
  const [data, setData] = useState(initializeData(chartData, colors));
  const [classifiedData, setClassifiedData] = useState(classifyData(data, slices));
  const [showTitle, setShowTitle] = useState(classifiedData.map((_) => true));
  const [titles, setTitles] = useState(classifiedData.map((d) => d.title));

  const [starts, setStarts] = useState(classifiedData.map((d, i) => ({ x: 25 + 15 + 25, y: 35 + 35 * i })));
  const [stops, setStops] = useState(starts.map((s, i) => getStop(s, i, labelDirection)));

  return (
    <Grid ref={ref} height={height} width={width} style={pieChartContainerStyle}>
      <PC
        radius={radius}
        data={classifiedData}
        label={({ dataEntry }) => `${Math.round(dataEntry.percentage)} %`}
        // onMouseOver={(e, segmentIdx) => handleGetCenters(e, segmentIdx, centers, setCenters)}
        style={{
          // transform: `translateX(-20%)`,
          transform: transform,
        }}
      >
        {/* {starts.map((start, i) => (
          <CurveArrowedLine
            key={i}
            width={400}
            height={200}
            visible={showTitle[0]}
            start={{ x: start.x, y: start.y }}
            stop={{ x: stops[i].x, y: stops[i].y }}
            data={classifiedData[0].title}
            color={"red"}
            labelDirection={labelDirection}
          />
        ))} */}
        {/* <CurveArrowedLine
            backgroundColor={"black"}
            width={200}
            height={150}
            visible={showTitle[0]}
            start={{ x: 0, y: 0 }}
            stop={{ x: 0, y: 100 }}
            data={classifiedData[0].title}
            color={"red"}
          /> */}
      </PC>
      {/* </g> */}
    </Grid>
  );
});

export default PieChartComponent;
