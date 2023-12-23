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

const ArrowsComponent = styled(Grid)(({ theme }) => ({
  width: "50%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
}));

const ReviewsContainerComponent = styled(Grid)(({ theme }) => ({
  width: "80vw",
  height: "50%",
  gap: "5px",
  backgroundColor: "#ffffff",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
}));

const ReviewsComponent = styled(Grid)(({ theme }) => ({
  contianer: true,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  width: "80vw",
}));

const ReviewComponent = styled(Grid)(({ theme }) => ({
  height: `200px`,
  width: `200px`,
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
    const nextSet = activeSet === Math.floor(reviews.length / 4) - 1 ? 0 : activeSet + 1;
    setActiveSet(nextSet);
  };

  const getPreviousSet = () => {
    const prevSet = activeSet === 0 ? Math.floor(reviews.length / 4) - 1 : activeSet - 1;
    setActiveSet(prevSet);
  };

  return (
    <ReviewsComponent data_id={"reviews-component"}>
      <ArrowsComponent>
        <FaArrowLeft onClick={() => getPreviousSet()} />
        <FaArrowRight onClick={() => getNextSet()} />
      </ArrowsComponent>
      <ReviewsContainerComponent container>
        {reviews
          .slice(active[0], active[1])
          .filter((review) => review != null)
          .map((review, i) => (
            <ReviewComponent item xs={4}>
              <div style={{ width: "100%" }}>
                <Text text={review.email} />
                <Text text={review.rating} />
                <Text text={review.review} />
              </div>
            </ReviewComponent>
          ))}
      </ReviewsContainerComponent>
    </ReviewsComponent>
  );
};

export default Reviews;
