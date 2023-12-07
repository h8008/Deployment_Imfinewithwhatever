import * as React from "react";
import { styled, useTheme } from "@mui/material";
import { TinderLikeCard } from "react-stack-cards";
import BorderedBox from "../ui_components/BorderedBox";

import Review from "./Review";
import Grid from "@mui/material/Grid";
import UpArrow from "@mui/icons-material/KeyboardArrowUp";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import { MessageContext } from "../providers/MessageProvider";
import { UPDATE_MESSAGE } from "../reducer/Message/MessageAction";

import API from "../API_Interface";

// const ReviewsComponent = styled("div")(({ theme, children, ...otherProps }) => ({
//   container: true,
//   height: "100%",
//   width: "100%",
//   backgroundColor: theme.palette.primary.dark.main,
//   zIndex: -2,
//   position: "relative",
//   display: "flex",
//   flexDirection: "row",
//   justifyContent: "center",
//   alignItems: "center",
//   ...otherProps,
// }));

const ReviewComponent = ({ children, theme, ...otherProps }) => {
  const style = {
    height: "100%",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    borderRadius: "20px",
    ...otherProps,
  };

  return <BorderedBox style={style}>{children}</BorderedBox>;
};

const ReviewsComponent = ({ children, theme, ...otherProps }) => {
  const style = {
    container: true,
    height: "100%",
    width: "100%",
    backgroundColor: theme.palette.primary.dark.main,
    zIndex: -2,
    position: "relative",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "20px",
    ...otherProps,
  };

  return <BorderedBox style={style}>{children}</BorderedBox>;
};

const SwipeComponent = styled(Grid)((props) => ({
  container: true,
  position: "absolute",
  columnGap: 20,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1,
}));

const ColumnComponent = styled(Grid)((props) => ({
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

const Reviews = (props) => {
  const theme = useTheme();
  const { messageDispatch } = React.useContext(MessageContext);
  return <ReviewsClassComponent theme={theme} messageDispatch={messageDispatch} reviews={props.reviews} />;
};

class ReviewsClassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      directionTinder: "swipeDownRight",
      directionToggle: "sideSlide",
      directionStack: "topRight",
      isOpen: false,
      reviews: [...this.props.reviews],
      swipableReviews: [...this.props.reviews],
      activeReviewIdx: 0,
    };
    this.Tinder = null;
    this.onTinderSwipe = this.onTinderSwipe.bind(this);
    this.onDeleteReview = this.onDeleteReview.bind(this);
    this.advanceIdx = this.advanceIdx.bind(this);
    this.theme = props.theme;
    this.messageDispatch = this.props.messageDispatch.bind(this);
  }

  componentDidMount() {
    if (this.state.reviews == null || this.state.reviews.length === 0) this.onEmptyData();
    if (this.state.reviews != null || this.state.swipableReviews.length !== this.state.reviews.length)
      this.setState({
        ...this.state,
        swipableReviews: this.state.reviews,
      });
  }

  advanceIdx(swipableReviewIdx) {
    return 0;
  }

  onTinderSwipe() {
    this.Tinder.swipe();
    if (this.state.swipableReviews.length === 0) return;
    if (this.state.swipableReviews.length === 1) return;

    const swipedReviewIdx = this.state.activeReviewIdx;
    const newActiveReviewIdx = this.advanceIdx(swipedReviewIdx);
    const newSwipableReviews = [...this.state.swipableReviews];
    const head = newSwipableReviews[0];

    newSwipableReviews.shift();
    newSwipableReviews.push(head);

    this.setState({
      ...this.state,
      activeReviewIdx: newActiveReviewIdx,
      swipableReviews: newSwipableReviews,
    });
  }

  onToggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.reviews !== this.state.reviews) {
      if (this.state.reviews.length === 0) {
        this.props.messageDispatch({
          type: UPDATE_MESSAGE,
          message: "You have no reviews left.",
        });
      }
    }
  }

  async onDeleteReview() {
    this.messageDispatch({
      type: UPDATE_MESSAGE,
      message: `Disclaimer: You are unable to delete what you wrote on our site.`,
    });
    // if (this.state.reviews.length === 0) return;
    // const { restaurant_id, email } = this.state.reviews[this.state.activeReviewIdx];
    // const res = await API.UserReviews.deleteReview({
    //   restaurantID: restaurant_id,
    //   email: email,
    // });
    // const newReviews = this.state.reviews.filter((review, index) => index !== this.state.activeReviewIdx);
    // this.setState({
    //   ...this.state,
    //   reviews: [...newReviews],
    //   swipableReviews: [...newReviews],
    // });
    // if (res.status === "OK") {
    //   console.log(res.message);
    // }
  }

  render() {
    const activeReviewIdx = this.state.activeReviewIdx;

    return (
      <React.Fragment>
        <ReviewsComponent theme={this.theme} />
        <SwipeComponent>
          {this.state.swipableReviews != null && this.state.swipableReviews.length > 0 && (
            <React.Fragment>
              <TinderLikeCard
                images={this.state.swipableReviews}
                width="800"
                height="200"
                direction={this.state.directionTinder}
                duration={400}
                ref={(node) => (this.Tinder = node)}
                className="tinder"
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <ReviewComponent>
                  <Review
                    review={this.state.swipableReviews[activeReviewIdx]}
                    onTinderSwipe={this.onTinderSwipe}
                    onDeleteReview={this.onDeleteReview}
                  />
                </ReviewComponent>
              </TinderLikeCard>
            </React.Fragment>
          )}
        </SwipeComponent>
      </React.Fragment>
    );
  }
}

export default Reviews;
