import { useRef, useState, useEffect } from "react";
import styled from "@emotion/styled";
import Text from "../ui_components/Text";
import Grid from "@mui/material/Grid";

import BarChart from "./BarChart/BarChart";
import PieChart from "./PieChart/PieChart";

import { Fragment } from "react";

const PreferenceComponent = styled(Grid)({
  height: "80%",
  width: "80%",
  margin: "auto",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  container: true,
  rowGap: 50,
});

const BarChartComponent = styled(Grid)({
  width: "100%",
  gridRow: true,
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
});

const PieChartComponentTopLeft = styled(Grid)({
  width: "100%",
  height: "100%",
  gridRow: true,
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "center",
});

const PieChartComponentBottomRight = styled(Grid)({
  width: "100%",
  height: "100%",
  gridRow: true,
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-end",
  alignItems: "center",
});

const Preferences = (props) => {
  const { preferences } = props;
  const { likes, dislikes, totalDataLength } = preferences;

  return (
    <PreferenceComponent>
      <PieChartComponentTopLeft>
        <PieChart title={"Your Most Liked"} chartData={likes} height={300} width={300} />
      </PieChartComponentTopLeft>
      <PieChartComponentBottomRight>
        <PieChart title={"Perhaps you don't like these"} chartData={dislikes} height={300} width={300} />
      </PieChartComponentBottomRight>
    </PreferenceComponent>
  );
};

export default Preferences;
