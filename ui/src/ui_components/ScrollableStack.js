import { useState, useEffect, useRef } from "react";
import Avatar from "@mui/material/Avatar";
// import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { Grid, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import UpArrow from "@mui/icons-material/KeyboardArrowUp";
<<<<<<< HEAD
=======
import DownArrow from "@mui/icons-material/KeyboardArrowDown";
>>>>>>> dev

import GridRow from "./GridRow";
import BorderedBox from "./BorderedBox";
import Text from "./Text";
import { Scrollbars } from "react-custom-scrollbars-2";
<<<<<<< HEAD
=======
import { Carousel } from "react-responsive-carousel";
import VerticalStack from "./VerticalStack";
>>>>>>> dev

const ColumnComponent = styled(Grid)(({ style }) => ({
  gridRow: true,
  display: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  height: "100%",
  width: style.width,
}));

const RowComponent = styled(Grid)({
  gridRow: true,
  display: "row",
  width: "100%",
  justifyContent: "space-evenly",
  alignItems: "center",
});

const ReviewsComponent = styled(Box)({
  gridRow: true,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "80%",
});

const ReviewComponent = styled(BorderedBox)(({ width }) => ({
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  height: "200px",
  width: width,
}));

const Item = styled(Text)({
  style: {
    padding: "0px",
    textAlign: "center",
    maxWidth: 400,
  },
});

const ScrollableStackComponent = styled(Grid)({
  container: true,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

export default function ScrollableStack(props) {
  const scrollbarRef = useRef(null);
  const { stack, style } = props;
  const [width, setWidth] = useState(400);

<<<<<<< HEAD
  return (
    <ScrollableStackComponent>
      <Scrollbars
        style={{
          height: "275px",
          width: width + 200,
          alignItems: "right",
        }}
      >
        <Stack direction="column" alignItems="center">
          {stack.length > 0 &&
            stack.map((item, index) => (
              <ReviewComponent
                width={`${width + index * 10}px`}
                data_id={"review-component"}
              >
                {/* <ColumnComponent
                  data_id={"column-component"}
                  style={{ width: "100%" }}
                > */}
                <RowComponent data_id="row-component">
                  <Text text={"restaurant:"} />
                  <Text
                    text={`${item.restaurantName}`}
                    color={"primary"}
                    style={{
                      textDecoration: "underline",
                    }}
                  />
                  <UpArrow />
                </RowComponent>
                {/* </ColumnComponent> */}
              </ReviewComponent>
            ))}
        </Stack>
      </Scrollbars>
    </ScrollableStackComponent>
  );
=======
  const handleScrollUp = () => {
    scrollbarRef.current.scrollTop(50);
  };

  const handleScrollDown = () => {
    const curY = scrollbarRef.current.getScrollTop();
    console.log(curY);
    scrollbarRef.current.scrollTop(curY + 200 - Math.floor(87 / 2));
  };

  const test_style = {
    height: "200px",
    width: "200px",
  };

  return <VerticalStack stack={stack} />;
>>>>>>> dev
}
