import { useRef, useState, useEffec, useMemo } from "react";
import styled from "@emotion/styled";
import Text from "../ui_components/Text";
import Grid from "@mui/material/Grid";
import PieChart from "./PieChart/PieChart";

import { Fragment } from "react";
import { Typography } from "@mui/material";

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
  height: "100%",
  width: "60%",
  gridRow: true,
}));

const PieChartComponentBottomRight = styled(Grid)((props) => ({
  width: "60%",
  height: "100%",
  gridRow: true,
}));

const PieChartTitleComponent = styled(Grid)((props) => ({
  width: "40%",
  height: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
}));

const EmptyContentComponent = styled(Typography)((props) => ({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
}));

const useInitializeTitle = (props) => {
  const { numLikes, numDislikes } = props;

  const titles = useMemo(() => {
    const choices = ["You have no liks", "Some of your favorites", "You like everything", "You don't like these"];
    const dataEmpty = [numLikes, numDislikes];
    return Array(dataEmpty.length)
      .fill()
      .map((empty, i) => (empty === 0 ? choices[i + (i % choices.length)] : choices[i + (i % choices.length) + 1]));
  }, [numLikes, numDislikes]);

  return titles;
};

const Preferences = (props) => {
  const { preferences } = props;
  const { likes, dislikes } = preferences;
  const titles = useInitializeTitle({ numLikes: likes.length, numDislikes: dislikes.length });

  console.log("titles", titles);

  // const titles = useMemo(() => {
  //   const titles = ["You have no liks", "Some of your favorites", "You like everything", "You don't like these"]
  //   const dataEmpty = [likes.length, dislikes.length]
  //   return Array(dataEmpty.length).fill().map((empty, i) => (
  //     !empty ? titles[i + i % titles.length] : titles[i + i % titles.length + 1]
  //   ))
  // }, [likes, dislikes])

  return (
    <Fragment>
      <PreferenceComponent>
        <PieChartComponentTopLeft alignItems={"flex-start"}>
          {likes.length > 0 && <PieChart chartData={likes} style={{ height: "100%", width: "100%" }} />}
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
