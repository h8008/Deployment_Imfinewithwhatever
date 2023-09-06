import { useContext, useState, useEffect, Fragment } from "react";
import API from "../API_Interface";
import { MessageContext } from "../providers/MessageProvider";
import UpArrow from "@mui/icons-material/KeyboardArrowUp";
import DownArrow from "@mui/icons-material/KeyboardArrowDown";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import { Button, Card, styled } from "@mui/material";
import Grid from "@mui/material/Grid";
import Text from "../ui_components/Text";
import BorderedBox from "../ui_components/BorderedBox";

const RowComponent = styled(Grid)(({ theme }) => ({
  gridRow: true,
  display: "flex",
  flexDirection: "row",
  justifyContent: theme == null ? "flex-start" : theme.justifyContent,
  alignItems: "flex-start",
  width: theme == null ? "50%" : theme.width,
}));

const ColumnComponent = styled(Grid)(({ theme }) => ({
  gridRow: true,
  display: "column",
  justifyContent: theme == null ? "center" : theme.justifyContent,
  alignItems: theme == null ? "center" : theme.alignItems,
}));

const Review = (props) => {
  const { review, onClick, onDeleteReview } = props;
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
      <RowComponent theme={{ width: "50%", justifyContent: "space-between" }}>
        <RowComponent theme={{ width: "70%" }}>
          <Text text="Restaurant: " style={{ marginRight: '5px' }} />
          <Text
            text={` ${review.restaurantName} `}
            style={{ textDecoration: "underline" }}
          />
        </RowComponent>
        <RowComponent theme={{ width: "30%", justifyContent: "flex-start" }}>
          <Text text={`Rating: `} style={{ marginRight: '5px' }} />
          <Text
            text={` ${review.rating} `}
            style={{ textDecoration: "underline" }}
          />
        </RowComponent>
      </RowComponent>
      <RowComponent>
        <Text text={"Review: "} style={{ marginRight: '5px' }} />
        <Text
          text={` ${review.review} `}
          style={{ textDecoration: "underline" }}
        />
      </RowComponent>
    </Fragment>
  );
};

export default Review;
