import { useRef, useState, useEffec, useMemo } from "react";
import styled from "@emotion/styled";
import Text from "../ui_components/Text";
import Grid from "@mui/material/Grid";
import PieChart from "./PieChart/PieChart";

import { Typography, useTheme } from "@mui/material";
import BorderedBox from "../ui_components/BorderedBox";

const PreferenceComponent = styled(Grid)(({ children, theme, ...otherProps }) => ({
  container: true,
  width: "85%",
  minHeight: "100vh",
  margin: "auto",
  display: "flex",
  rowGap: 25,
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  // backgroundColor: theme.palette.primary.dark.main,
  ...otherProps,
}));

const RowComponent = ({ children, theme, ...otherProps }) => {
  const style = {
    container: true,
    marginTop: "10%",
    // height: "50%",
    height: "95vh",
    width: "100%",
    margin: "auto",
    ...otherProps,
  };
  const sx = {
    // height: "95%",
    height: "300px",
    weight: "300px",
    display: "flex",
    // flexDirection: { xs: "column", sm: "row" },
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.palette.primary.dark.main,
    borderRadius: "20px",
  };
  return (
    <Grid sx={style}>
      <BorderedBox sx={sx}>{children}</BorderedBox>
    </Grid>
  );
};

const PieChartComponentTopLeft = styled(Grid)(({ children, ...otherProps }) => ({
  // height: "100%",
  // width: "60%",
  gridRow: true,
  ...otherProps,
}));

const PieChartComponentBottomRight = styled(Grid)(({ children, ...otherProps }) => ({
  // width: "60%",
  // height: "100%",
  gridRow: true,
  ...otherProps,
}));

const PieChartTitleComponent = styled(Grid)((props) => ({
  // width: "40%",
  // height: "100%",
  // display: "flex",
  // flexDirection: "row",
  // justifyContent: "center",
  // alignItems: "center",
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
    const choices = ["You have no likes", "Some of your favorites", "You liked everything", "You didn't like these"];
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
      <Grid
        sx={{
          width: { xs: "100%", sm: "50%"},
          height: "fit-content",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          border: `8px solid white`
        }}
        // pt={3}
        p={1}
        // pl={1}
        // pr={1}
      >
        <Grid
          sx={{
            height: "fit-content",
            width: "100%",
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "center",
            alignItems: "center",
          }}
          pt={2}
        >
          <PieChartComponentTopLeft sx={{ width: { xs: "100%", sm: "60%" } }} mt={2} mb={2} >
            <PieChart chartData={likes} height={"100%"} width={"100%"} />
          </PieChartComponentTopLeft>
          <PieChartTitleComponent sx={{ width: { xs: "100%", sm: "40%" } }} mb={2}>
            {likes.length > 0 ? (
              <Text
                text={titles[0]}
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: { sm: "row", md: "column" },
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "200%",
                }}
              />
            ) : (
              <Text text={titles[0]} fontSize={"400%"} />
            )}
          </PieChartTitleComponent>
        </Grid>
        {/* </RowComponent>
      <RowComponent theme={theme}> */}
        <Grid
          sx={{
            height: "fit-content",
            width: "100%",
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <PieChartTitleComponent sx={{ width: { xs: "100%", sm: "40%" } }} mb={2}>
            {dislikes.length > 0 ? (
              <Text text={titles[1]} fontSize={"200%"} />
            ) : (
              <Text text={titles[3]} fontSize={"400%"} />
            )}
          </PieChartTitleComponent>
          <PieChartComponentBottomRight sx={{ width: { xs: "100%", sm: "60%" } }} mt={2} mb={2}>
            <PieChart chartData={dislikes}  height={"100%"} width={"100%"} />
          </PieChartComponentBottomRight>
        </Grid>
      </Grid>
      {/* </RowComponent> */}
    </PreferenceComponent>
  );
};

export default Preferences;
