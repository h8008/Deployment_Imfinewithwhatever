import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
// styled-component wrap
import { Swiper, SwiperSlide } from "swiper/react";
// SwiperSlide is pretty self-explantory. it is one slide that would contain
// one of data you want to show
// import SwiperCore, { Navigation, Pagination, EffectFade, Autoplay } from "swiper";
import React, { useMemo, useState } from "react";
import { useTheme, Grid, styled } from "@mui/material";
import { FaArrowRight, FaArrowLeft, FaRibbon } from "react-icons/fa6";

import { MessageContext } from "../providers/MessageProvider";
import Text from "../ui_components/Text";
import BorderedBox from "../ui_components/BorderedBox";

const ArrowsComponent = styled(Grid)(({ theme }) => ({
  width: "50%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
}));

const ReviewsContainerComponent = styled(Grid)(({ theme }) => ({
  // width: "80vw",
  // height: "50%",
  // gap: "5px",
  // overflow: "scroll",
  // backgroundColor: "#ffffff",
}));

const ReviewsComponent = styled(Grid)(({ theme }) => ({
  container: true,
  display: "flex",
  flexDirection: "column",
  gap: "100px",
  justifyContent: "center",
  alignItems: "center",
  height: "90vh",
  width: "80vw",
}));

const ReviewComponent = styled(Grid)(({ theme }) => ({
  padding: "8px",
  border: `8px solid black`,
  borderRadius: "20px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
}));

const Reviews = ({ reviews }) => {
  const theme = useTheme();
  const { messageDispatch } = React.useContext(MessageContext);
  const [activeSet, setActiveSet] = useState(0);
  const active = useMemo(() => [0 + activeSet * 4, 4 + activeSet * 4], [activeSet]);

  //   console.log("active", active);

  const getNextSet = () => {
    if (reviews.length <= 4) return;
    const nextSet = activeSet === Math.floor(reviews.length / 4) - 1 ? 0 : activeSet + 1;
    setActiveSet(nextSet);
  };

  const getPreviousSet = () => {
    if (reviews.length <= 4) return;
    const prevSet = activeSet === 0 ? Math.floor(reviews.length / 4) - 1 : activeSet - 1;
    setActiveSet(prevSet);
  };

  return (
    <ReviewsComponent data_id={"reviews-component"} mt={30}>
      <ArrowsComponent>
        <FaArrowLeft onClick={() => getPreviousSet()} />
        <FaArrowRight onClick={() => getNextSet()} />
      </ArrowsComponent>
      <ReviewsContainerComponent
        container
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row", md: "row" },
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {reviews
          .slice(active[0], active[1])
          .filter((review) => review != null)
          .map((review, i) => (
            <ReviewComponent
              item
              sx={{
                width: {
                  xs: "200px",
                  sm: "400px",
                },
                height: {
                  xs: "200px",
                  sm: "400px",
                },
              }}
            >
              <div style={{ width: "100%" }}>
                <Grid
                  // display={"flex"}
                  // flex={1}
                  // flexDirection={"row"}
                  // alignItems={"center"}
                  // justifyContent={"flex-start"}
                  margin="auto"
                  sx={{
                    display: "flex",
                    width: { sm: "100%", md: "50%" },
                    flexDirection: { xs: "column", sm: "row" },
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Grid mr={5}>
                    <Text text={review.email} />
                  </Grid>
                  <Grid mr={5}>
                    <Text text={`Rating: ${review.rating}`} />
                  </Grid>
                </Grid>
                <Grid
                  height={"fit-content"}
                  display={"flex"}
                  flexDirection={"row"}
                  justifyContent={"flex-start"}
                  alignItems={"center"}
                  // flexWrap={"wrap"}
                  borderTop={`2px black solid`}
                  borderRadius={`1px`}
                >
                  <Text text={review.review} />
                </Grid>
              </div>
            </ReviewComponent>
          ))}
      </ReviewsContainerComponent>
    </ReviewsComponent>
  );
};

export default Reviews;
