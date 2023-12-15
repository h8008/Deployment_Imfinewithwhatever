import { useMemo, useState } from "react";
import styled from "@emotion/styled";
import { Box, CardMedia, Grid } from "@mui/material";
import BorderedBox from "../../ui_components/BorderedBox";
import Text from "../../ui_components/Text";

const SummaryComponent = styled(Grid)(({ children, ...otherProps }) => ({
  container: true,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: `translate(-50%, -50%)`,
  border: "8px black solid",
  borderRadius: "20px",
  padding: "20px",
}));

// const SummaryComponent = ({ children, ...otherProps }) => {
//   const style = {
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center",
//     alignItems: "center",
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     transform: `translate(-50%, -50%)`,
//     borderRadius: "20px",
//     padding: "20px",
//     ...otherProps,
//   };

//   return <BorderedBox style={style}>{children}</BorderedBox>;
// };

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
  const mainText = `Based on your reviews, you like`;
  return <Text text={mainText} />;
};

const BubbleComponent = styled(Box)(({ children, ...otherProps }) => ({
  radius: "50%",
  ...otherProps,
  border: `8px black dashed`,
}));

const LikeComponent = ({ likes }) => {
  const mainText = `You swiped left on these tastes`;
  const bubbleDims = likes.map((like, i) => ({ width: like[1] * 15, height: like[1] * 15 }));

  return (
    <Grid>
      <Text text={mainText} />
      {bubbleDims.map((dim, i) => (
        <BubbleComponent width={dim.width} height={dim.height} />
      ))}
    </Grid>
  );
};

const DislikeComponent = ({ dislikes }) => {
  const mainText = `You swiped right on these tastes`;
  return <Text text={mainText} />;
};

const getComponents = (likes, dislikes, reviews) => {
  return [
    <LikeComponent likes={likes} />,
    <DislikeComponent dislikes={dislikes} />,
    <ReviewComponent reviews={reviews} />,
  ];
};

const Summary = ({ summary, ...otherProps }) => {
  console.log("summary", summary);
  const { reviewSummary, preferenceSummary } = summary;
  const items = ["Your Most Liked", "Your Least Favorite", "Based On The Reviews You Left"];
  const components = useMemo(
    () => getComponents(preferenceSummary.whitelist, preferenceSummary.blacklist, reviewSummary),
    [preferenceSummary.blacklist, preferenceSummary.whitelist, reviewSummary]
  );
  const [activeComponentIdx, setActiveComponentIdx] = useState(0);

  return (
    <SummaryComponent {...otherProps}>
      <TitlesComponent>
        {items.map((item, i) => (
          <BorderedBox style={{ width: "30%", borderRadius: "8px", border: "8px solid white" }}>
            <Text text={item} color="white" key={`Summary Item ${i}`} />
          </BorderedBox>
        ))}
      </TitlesComponent>
      <ContentComponent>
        {/* <BorderedBox style={{ borderRadius: "8px", border: "8px solid white" }}></BorderedBox> */}
        {components[activeComponentIdx]}
      </ContentComponent>
    </SummaryComponent>
  );
};

export default Summary;
