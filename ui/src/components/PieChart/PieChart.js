import React, { Fragment, useState, useMemo } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Chart } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 2,
    },
  ],
};

const palette = {
  backgroundColor: [
    "rgba(255, 99, 132, 0.2)",
    "rgba(54, 162, 235, 0.2)",
    "rgba(255, 206, 86, 0.2)",
    "rgba(75, 192, 192, 0.2)",
    "rgba(153, 102, 255, 0.2)",
    "rgba(255, 159, 64, 0.2)",
  ],
  borderColor: [
    "rgba(255, 99, 132, 1)",
    "rgba(54, 162, 235, 1)",
    "rgba(255, 206, 86, 1)",
    "rgba(75, 192, 192, 1)",
    "rgba(153, 102, 255, 1)",
    "rgba(255, 159, 64, 1)",
  ],
};

const getBackgroundColors = (data, num) => {
  const getColorIdx = (i) => (i + i === palette.backgroundColor.length ? 0 : i + 1);
  var colorIdx = -1;
  const colors = data.map((d, i) => {
    colorIdx = getColorIdx(colorIdx);
    return [palette.backgroundColor[colorIdx], palette.borderColor[colorIdx]];
  });

  const backgroundColor = colors.map((color) => color[0]);
  const borderColor = colors.map((color) => color[1]);
  return [backgroundColor, borderColor];
};

const redistributeVotes = (data) => {
  const totalVotes = data.reduce((acc, cur) => acc + cur, 0);
  const weight = 360 / totalVotes;
  const votes = data.map((d) => d * weight);

  return votes;
};

const getData = (chartData) => {
  const labels = chartData.map((d, i) => d[0]);
  const data = redistributeVotes(chartData.map((d, i) => d[1]));

  const label = "# of Votes";
  const borderWidth = 2;
  const [backgroundColor, borderColor] = getBackgroundColors(data);
  return {
    labels,
    datasets: [
      {
        label,
        data,
        backgroundColor,
        borderColor,
        borderWidth,
      },
    ],
  };
};

const getOptions = (props) => ({
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
    },
    title: {
      display: false,
    },
  },
  scales: {
    height: props.height,
    width: props.width,
  },
});

const PieChart = ({ chartData, title, ...otherProps }) => {
  // console.log("chart data", chartData);
  const [data, setData] = useState(getData(chartData));
  const { width, height } = otherProps;
  // useDrawPieChart(width, height, radius, data, options)

  return (
    <Fragment>{data && <Pie style={{ height, width }} data={data} options={getOptions({ width, height })} />}</Fragment>
  );
};

export default PieChart;
