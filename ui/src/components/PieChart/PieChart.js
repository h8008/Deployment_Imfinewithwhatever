import { color } from "d3";
import { Fragment, useState } from "react";
import { PieChart as PC } from "react-minimal-pie-chart";
import CurveArrowedLine from "../../ui_components/CurveArrowedLine";

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

const PieChartComponent = (props) => {
  const { chartData } = props;
  const [colors, setColors] = useState(getColors(chartData));
  const [slices, setSlices] = useState(getTotalSlices(chartData));
  const [data, setData] = useState(initializeData(chartData, colors));
  const [classifiedData, setClassifiedData] = useState(classifyData(data, slices));
  const [showTitle, setShowTitle] = useState(classifiedData.map((_) => true));
  const [titles, setTitles] = useState(classifiedData.map((d) => d.title));
  //   const [titleStartPos, setTitleStartPos] = useState(classifiedData.map((_) => ({ x: 0, y: 0 })));
  //   const [arrows, setArrows] = useState(
  //     titles.map((_, idx) => [showTitle[idx], titleStartPos[idx], titles[idx], colors[idx]])
  //   );

  return (
    <Fragment>
      <PC
        data={classifiedData}
        label={({ dataEntry }) => `${Math.round(dataEntry.percentage)} %`}
        // onMouseOver={(e, segmentIdx) =>
        //   handleShowCategories(e, segmentIdx, showTitle, setShowTitle, titleStartPos, setTitleStartPos)
        // }
      />
      {/* {arrows.map((arrowProps) => getCurvedLine([...arrowProps]))} */}
    </Fragment>
  );
};

export default PieChartComponent;
