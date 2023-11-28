import { useRef, useState, useEffect } from "react";
import styled from "@emotion/styled";
import Text from "../ui_components/Text";
import Grid from "@mui/material/Grid";

import BarChart from "./BarChart/BarChart";
import PieChart from "./PieChart/PieChart";

import { Fragment } from "react";

const PreferenceComponent = styled(Grid)(({ children, ...otherProps }) => ({
  container: true,
  height: "50%",
  width: "100%",
  margin: "auto",
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  ...otherProps,
}));

const PieChartComponentTopLeft = styled(Grid)((props) => ({
  // width: props.width,
  height: "100%",
  width: "60%",
  gridRow: true,
  // display: "flex",
  // flexDirection: "row",
  // justifyContent: "flex-start",
}));

const PieChartComponentBottomRight = styled(Grid)((props) => ({
  width: "60%",
  height: "100%",
  gridRow: true,
  // display: "flex",
  // flexDirection: "row",
  // justifyContent: "center",
}));

const PieChartTitleComponent = styled(Grid)((props) => ({
  width: "40%",
  height: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
}));

const Preferences = (props) => {
  const { preferences } = props;
  const { likes, dislikes, totalDataLength } = preferences;

  return (
    <Fragment>
      <PreferenceComponent>
        <PieChartComponentTopLeft alignItems={"flex-start"}>
          <PieChart chartData={likes} style={{ height: "100%", width: "100%" }} />
        </PieChartComponentTopLeft>
        <PieChartTitleComponent>
          <Text text={"Your Most Liked"} fontSize={"300%"} />
        </PieChartTitleComponent>
      </PreferenceComponent>
      <PreferenceComponent alignItems={"flex-end"}>
        <PieChartTitleComponent>
          <Text text={"You didn't like these"} fontSize={"300%"} />
        </PieChartTitleComponent>
        <PieChartComponentBottomRight>
          <PieChart chartData={dislikes} style={{ height: "100%", width: "100%" }} />
        </PieChartComponentBottomRight>
      </PreferenceComponent>
    </Fragment>
  );
};

export default Preferences;
