import { Fragment, useMemo, useState } from "react";
import styled from "@emotion/styled";
import { Box, Button, CardMedia, Grid } from "@mui/material";
import BorderedBox from "../../ui_components/BorderedBox";
import Text from "../../ui_components/Text";
import BarChart from "../BarChart/A_Better_Barchart";

const SummaryComponent = styled(Grid)(({ children, ...otherProps }) => ({
  container: true,
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: `translate(-50%, -50%)`,
  // border: "8px black solid",
  // borderRadius: "20px",
  padding: "20px",
  ...otherProps,
  zIndex: 3,
}));

const TitlesComponent = styled(Grid)(() => ({
  gridRow: true,
  display: "flex",
  width: "100%",
  flexDirection: "row",
  justifyContent: "space-evenly",
  alignItems: "center",
  flexWrap: "wrap",
}));

const ContentComponent = styled(Grid)(() => ({
  gridRow: true,
  width: "100%",
  height: "60%",
  border: "8px white solid",
  borderRadius: "8px",
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
    <Fragment>
      <Text text={mainText} />
      <BarChart {...chartProps} />
    </Fragment>
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
  height: "90%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-evenly",
  alignItems: "center",
}));

const LikeComponent = ({ likes }) => {
  const mainText = `You swiped left on these tastes`;

  const bubbleSx = likes.map((dislike, i) => ({
    width: dislike[1] * 1.5 * 20,
    height: dislike[1] * 1.5 * 20,
    transform: `translateY(${i % 2 === 0 ? 2 * dislike[1] : -2 * dislike[1]}%)`,
  }));

  return (
    <Fragment>
      <Text text={mainText} />
      <BubblesComponent>
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
    width: dislike[1] * 1.5 * 20,
    height: dislike[1] * 1.5 * 20,
    transform: `translateY(${i % 2 === 0 ? 2 * dislike[1] : -2 * dislike[1]}%)`,
  }));
  return (
    <Grid>
      <Text text={mainText} />
      <BubblesComponent>
        {bubbleSx.map((sx, i) => (
          <BubbleComponent key={`bubble ${i}`} sx={sx}>
            <Text text={dislikes[i]} color="red" />
          </BubbleComponent>
        ))}
      </BubblesComponent>
    </Grid>
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

  console.log("review summaries", reviewSummary);

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
    <SummaryComponent {...otherProps}>
      <TitlesComponent>
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
