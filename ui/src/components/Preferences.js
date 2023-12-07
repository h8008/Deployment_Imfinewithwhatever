import { useRef, useState, useEffec, useMemo } from "react";
import styled from "@emotion/styled";
import Text from "../ui_components/Text";
import Grid from "@mui/material/Grid";
import PieChart from "./PieChart/PieChart";

import { Typography, useTheme } from "@mui/material";
import BorderedBox from "../ui_components/BorderedBox";

const PreferenceComponent = styled(Grid)(({ children, theme, ...otherProps }) => ({
  container: true,
  height: "100%",
  width: "85%",
  margin: "auto",
  display: "flex",
  rowGap: 25,
  flexDirection: "column",
  justifyContent: "center",
  ...otherProps,
}));

const RowComponent = ({ children, theme, ...otherProps }) => {
  const style = {
    container: true,
    height: "50%",
    width: "100%",
    margin: "auto",
    ...otherProps,
  };
  const boxStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    backgroundColor: theme.palette.primary.dark.main,
    borderRadius: "20px",
  };
  return (
    <Grid sx={style}>
      <BorderedBox style={boxStyle}>{children}</BorderedBox>
    </Grid>
  );
};

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
  color: "white",
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
    const choices = ["You have no likes", "Some of your favorites", "You like everything", "You don't like these"];
    const dataEmpty = [numLikes, numDislikes];
    return dataEmpty.map((empty, i) =>
      empty === 0 ? choices[i + (i % choices.length)] : choices[i + (i % choices.length) + 1]
    );
  }, [numLikes, numDislikes]);

  return titles;
};

const Preferences = (props) => {
  const theme = useTheme();
  const { preferences } = props;
  const { likes, dislikes } = preferences;
  const titles = useInitializeTitle({ numLikes: likes.length, numDislikes: dislikes.length });

  return (
    <PreferenceComponent>
      <RowComponent theme={theme} alignItems={"flex-start"}>
        {likes.length > 0 && (
          <PieChartComponentTopLeft>
            <PieChart chartData={likes} style={{ height: "85%", width: "100%" }} />
          </PieChartComponentTopLeft>
        )}
        <PieChartTitleComponent>
          <Text text={titles[0]} fontSize={"300%"} />
        </PieChartTitleComponent>
      </RowComponent>
      <RowComponent theme={theme} alignItems={"flex-end"}>
        {dislikes.length > 0 && (
          <PieChartTitleComponent>
            <Text text={titles[1]} fontSize={"300%"} />
          </PieChartTitleComponent>
        )}
        <PieChartComponentBottomRight>
          <PieChart chartData={dislikes} style={{ height: "85%", width: "100%" }} />
        </PieChartComponentBottomRight>
      </RowComponent>
    </PreferenceComponent>
  );
};

export default Preferences;
