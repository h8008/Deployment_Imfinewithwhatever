import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Grid, Card, CardContent, CardMedia, styled } from "@mui/material";
import Text from "./Text";

const StackItemComponent = styled(Grid)({
  gridRow: true,
});

const VerticalStack = (props) => {
  const { stack } = props;

  return (
    <Carousel
      axis={"vertical"}
      centerMode="true"
      showArrows={true}
      showIndicators={false}
      showThumbs={false}
    >
      {stack.map((item) => (
        <StackItemComponent>
          <Text text={item.restaurantName} />
          <Text text={item.review} />
        </StackItemComponent>
      ))}
    </Carousel>
  );
};

export default VerticalStack;
