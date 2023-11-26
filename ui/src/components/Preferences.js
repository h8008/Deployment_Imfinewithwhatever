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
  flex: "100%",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  container: true,
});

const BarChartComponent = styled(Grid)({
  width: "100%",
  gridRow: true,
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
});

const PieChartComponentTopLeft = styled(Grid)((props) => ({
  // width: "100%",
  width: props.width,
  height: "100%",
  gridRow: true,
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
}));

const PieChartComponentBottomRight = styled(Grid)((props) => ({
  // width: "100%",
  width: props.width,
  height: "100%",
  gridRow: true,
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
}));

const Preferences = (props) => {
  const { preferences } = props;
  const { likes, dislikes, totalDataLength } = preferences;

  return (
    <PreferenceComponent>
      <PieChartComponentTopLeft width={"30%"}>
        <PieChart title={"Your Most Liked"} chartData={likes} height={200} width={200} />
      </PieChartComponentTopLeft>
      <PieChartComponentBottomRight width={"30%"}>
        <PieChart title={"Perhaps you don't like these"} chartData={dislikes} height={200} width={200} />
      </PieChartComponentBottomRight>
    </PreferenceComponent>
  );
};

export default Preferences;
