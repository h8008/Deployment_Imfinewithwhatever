import { Fragment, useMemo, useState } from "react";
import styled from "@emotion/styled";
import { Box, Button, CardMedia, Grid } from "@mui/material";
import BorderedBox from "../../ui_components/BorderedBox";
import Text from "../../ui_components/Text";
import BarChart from "../BarChart/A_Better_Barchart";

const SummaryComponent = styled(Grid)(({ children, ...otherProps }) => ({
  container: true,
  width: "80%",
  height: "fit-content",
  // outline: "1px solid black",
  gap: "80px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: `translate(-50%, -50%)`,
  padding: "10px",
  ...otherProps,
}));

const TitlesComponent = styled(Grid)(() => ({
  gridRow: true,
  width: "100%",
  flexWrap: "wrap",
}));

const ContentComponent = styled(Grid)(() => ({
  gridRow: true,
  width: "60%",
  height: "fit-content",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  // border: "8px white solid",
  // borderRadius: "8px",
}));

const ReviewComponent = ({ reviews }) => {
  const mainText = `Based on your reviews`;
  const names = useMemo(() => ["", "Good", "Bad", "Neutral"], []);
  const data = useMemo(
    () =>
      Object.values(reviews)
        .map((data, i) => {
          return i > 0 ? { name: names[i], data: data.length } : null;
        })
        .filter((d) => d != null),
    [names, reviews]
  );
  const chartProps = {
    chartData: data,
    totalDataLength: data.length,
    color: "white",
  };

  return (
    <Grid sx={{ width: "80%", height: "fit-content", padding: "10px" }}>
      {/* <Text text={mainText} /> */}
      <BarChart {...chartProps} width={"100%"} height={"80%"} />
    </Grid>
  );
};

const BubbleComponent = styled(Box)(({ children, theme, ...otherProps }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "50%",
  border: `2px red dashed`,
  backgroundColor: theme.palette.primary.light.main,
  ...otherProps,
}));

const BubblesComponent = styled(Grid)((props) => ({
  width: "100%",
  height: "fit-content",
  // display: "flex",
  // flexDirection: "row",
  // justifyContent: "space-evenly",
  // alignItems: "center",
}));

const LikeComponent = ({ likes }) => {
  const mainText = `You swiped left on these tastes`;

  const bubbleSx = likes.map((like, i) => ({
    width: like[1] * 40,
    height: like[1] * 40,
    // transform: `translateY(${i % 2 === 0 ? 2 * dislike[1] : -2 * dislike[1]}%)`,
  }));

  return (
    <Fragment>
      {/* <Text text={mainText} /> */}
      <BubblesComponent
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row " },
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        {bubbleSx.map((sx, i) => (
          <BubbleComponent key={`bubble ${i}`} sx={sx}>
            <Text
              text={likes[i]}
              color="red"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            />
          </BubbleComponent>
        ))}
      </BubblesComponent>
    </Fragment>
  );
};

const DislikeComponent = ({ dislikes }) => {
  const mainText = `You swiped right on these tastes`;
  const bubbleSx = dislikes.map((dislike, i) => ({
    width: dislike[1] * 40,
    height: dislike[1] * 40,
    transform: `translateY(${i % 2 === 0 ? 2 * dislike[1] : -2 * dislike[1]}%)`,
  }));
  return (
    <Fragment>
      {/* <Text text={mainText} /> */}
      <BubblesComponent
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row " },
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        {bubbleSx.map((sx, i) => (
          <BubbleComponent key={`bubble ${i}`} sx={sx}>
            <Text text={dislikes[i]} color="red" />
          </BubbleComponent>
        ))}
      </BubblesComponent>
    </Fragment>
  );
};

const getComponents = (likes, dislikes, reviews) => {
  return [
    <LikeComponent likes={likes} />,
    <DislikeComponent dislikes={dislikes} />,
    <ReviewComponent reviews={reviews} />,
  ];
};

const getComponent = (components, i) => {
  return components[i];
};

const Summary = ({ summary, ...otherProps }) => {
  console.log("summary", summary);
  const { reviewSummary, preferenceSummary } = summary;

  const items = ["Your Most Liked", "Your Least Favorite", "Based On Your Reviews"];
  const components = useMemo(
    () => getComponents(preferenceSummary.whitelist, preferenceSummary.blacklist, reviewSummary),
    [preferenceSummary.blacklist, preferenceSummary.whitelist, reviewSummary]
  );

  const [activeComponentIdx, setActiveComponentIdx] = useState(0);
  const handleRenderActiveComponent = (i) => {
    setActiveComponentIdx(i);
  };

  return (
    <SummaryComponent
      {...otherProps}
      sx={{
        overflow: { sm: "hidden", xs: "scroll" },
        msOverflowStyle: "none",
        scrollbarWidth: "none",
      }}
    >
      <TitlesComponent
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        {items.map((item, i) => (
          <Button sx={{ width: "fit-content", padding: "10px" }} onClick={() => handleRenderActiveComponent(i)}>
            <BorderedBox style={{ borderRadius: "8px", border: "8px solid white" }}>
              <Text text={item} color="white" key={`Summary Item ${i}`} />
            </BorderedBox>
          </Button>
        ))}
      </TitlesComponent>
      <ContentComponent>{getComponent(components, activeComponentIdx)}</ContentComponent>
    </SummaryComponent>
  );
};

export default Summary;
