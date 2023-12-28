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
  // container: true,
  // display: "flex",
  // flexDirection: "column",
  // gap: "100px",
  // justifyContent: "center",
  // alignItems: "center",
  // height: "100vh",
  // width: "80vw",
  container: true,
  width: "85%",
  minHeight: "100vh",
  margin: "auto",
  display: "flex",
  rowGap: 25,
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
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
    <ReviewsComponent data_id={"reviews-component"}>
      <Grid         
        sx={{
          width: { xs: "100%", sm: "50%"},
          height: "fit-content",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          border: `8px solid white`,
          borderRadius: "20px"
        }}
        gap={5}
        p={3}> 
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
                  xs: "fit-content",
                  sm: "400px",
                },
                height: {
                  xs: "fit-content",
                  sm: "400px",
                },
              }}
              // sx={{ width: "fit-content", height:"fit-content"}}
            >
              <div style={{ width: "100%" }}>
                <Grid
                  // margin="auto"
                  sx={{
                    width: "fit-content",
                    display: "flex",
                    width: { sm: "100%", md: "50%" },
                    flexDirection: { xs: "column", sm: "row" },
                    justifyContent: "flex-start",
                    alignItems: "center",
                    color:"white"
                  }}
                  gap={2}
                >
                  {/* <Grid mr={3}> */}
                    <Text text={review.email} />
                  {/* </Grid> */}
                  {/* <Grid mr={3}> */}
                    <Text text={`Rating: ${review.rating}`} />
                  {/* </Grid> */}
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
      </Grid>
    </ReviewsComponent>
  );
};

export default Reviews;
