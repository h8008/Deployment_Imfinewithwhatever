import { useContext, useState, useEffect, Fragment } from "react";
import { MessageContext } from "../providers/MessageProvider";
import UpArrow from "@mui/icons-material/KeyboardArrowUp";
import DownArrow from "@mui/icons-material/KeyboardArrowDown";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import Text from "../ui_components/Text";
import Stars from "./Stars";

import { styled } from "@mui/material";
import Grid from "@mui/material/Grid";

const ButtonsComponent = styled(Grid)((props) => ({
  data_id: "column-component",
  gridRow: true,
  heights: `${props.numItems * 50}px`,
  width: `50px`,
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
}));

const ButtonComponent = styled(Grid)((children, ...otherProps) => ({
  data_id: "review-interactive-button-component",
  gridRow: true,
  ...otherProps,
}));

const RowComponent = styled(Grid)(({ theme, style }) => ({
  gridRow: true,
  display: "flex",
  flexDirection: "row",
  justifyContent: style != null && style.justifyContent != null ? style.justifyContent : "flex-start",
  alignItems: "center",
  width: style != null && style.width != null ? style.width : "100%",
}));

const ColumnComponent = styled(Grid)(({ theme }) => ({
  gridRow: true,
  display: "column",
  justifyContent: theme == null ? "center" : theme.justifyContent,
  alignItems: theme == null ? "center" : theme.alignItems,
}));

const ReviewContentComponent = styled(Grid)(() => ({
  gridRow: true,
  width: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "center",
  flexWrap: "wrap",
}));

const ReviewComponent = styled(Grid)(({ theme, ...otherProps }) => ({
  contain: true,
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}));

const Review = (props) => {
  const { review, onClick, onDeleteReview, onTinderSwipe } = props;
  const { messageState, messageDispatch } = useContext(MessageContext);
  const [restaurant, setRestaurant] = useState({});

  // useEffect(() => {
  //   const getRestaurant = async () => {
  //     const res = await API.YelpAPI.getRestaurantById({
  //       id: review.restaurantID,
  //     });
  //     const restaurant = API.apiResHandling(res, messageDispatch, res.message);
  //     if (restaurant != null) setRestaurant({ ...restaurant });
  //   };
  //   getRestaurant();
  // }, []);

  // useEffect(() => {
  //   console.log("reviewed restaurant", restaurant);
  // }, [restaurant]);

  return (
    <Fragment>
      <ReviewComponent>
        {/* <RowComponent style={{ justifyContent: "space-between" }}> */}
        <RowComponent style={{ width: "100%", justifyContent: "space-between" }}>
          {/* <RowComponent style={{ width: "70%" }}> */}
          <RowComponent>
            <Text text="Restaurant: " style={{ marginRight: "5px" }} />
            <Text text={` ${review.restaurant_name} `} style={{ textDecoration: "none" }} />
          </RowComponent>
          <RowComponent style={{ justifyContent: "center" }}>
            <Stars rating={review.rating} />
          </RowComponent>
          <RowComponent style={{ justifyContent: "flex-end" }}>
            <ButtonComponent onClick={onTinderSwipe}>
              <UpArrow />
            </ButtonComponent>
            <ButtonComponent onClick={onTinderSwipe}>
              <DeleteForeverIcon />
            </ButtonComponent>
          </RowComponent>
        </RowComponent>
        <ReviewContentComponent>
          <Text text={"Review: "} style={{ marginRight: "5px" }} />
          <Text text={` ${review.review} `} style={{ textDecoration: "none" }} />
        </ReviewContentComponent>
      </ReviewComponent>
    </Fragment>
  );
};

export default Review;
