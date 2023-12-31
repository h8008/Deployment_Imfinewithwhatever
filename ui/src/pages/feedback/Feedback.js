import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import MUIGrid from "@mui/material/Grid";
import MUITextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material";

import Grid from "../../ui_components/Grid";
import Text from "../../ui_components/Text";
import GridItem from "../../ui_components/GridItem";
import RoundButton from "../../ui_components/RoundButton";

import { main_config } from "../../styles/shared";

import { UserContext } from "../../providers/UserProvider";
import { RestaurantsContext } from "../../providers/RestaurantsProvider";
import { MessageContext } from "../../providers/MessageProvider";

import { API } from "../../API_Interface";
import { UPDATE_MESSAGE } from "../../reducer/Message/MessageAction";

import Stars from "../../components/Stars";
import { useTheme } from "styled-components";
import Modal from "../modal";

const calcCellWidth = (addon = 0) => {
  const cellBorderWidth = 3;
  const totalWidth = parseInt(main_config.pages.feedback.rater.width.slice(0, -2));
  const width = Math.round(totalWidth / 10) - cellBorderWidth * 2 + addon + "px";
  return width;
};

const barCellConfig = {
  height: main_config.pages.feedback.rater.height,
  width: calcCellWidth(),
  border: "5px solid black",
  margin: "0px",
  backgroundColor: "white",
  overflow: "hidden",
};

const RowComponent = styled(Grid)(({ theme }) => ({
  gridRow: true,
  width: "100%",
  height: "30px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const TextComponent = styled(Typography)(({ children, ...otherProps }) => ({
  width: "30%",
  margin: "auto",
  ...otherProps,
}));

const BarComponent = (props) => {
  const calcRowWidth = (numCells) => {
    const cellBorderWidth = 1;
    const width =
      (parseInt(calcCellWidth().slice(0, -2)) + cellBorderWidth * 2) * numCells + cellBorderWidth * 2 + "px";

    return width;
  };

  const rowStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  };

  const barStyle = {
    display: "flex",
    // flex: "70%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
  };

  const Cells = (props) => {
    return props.cells.map((cell, index) => (
      <GridItem
        index={index}
        onHoverCallback={props.onBarCellHoverCallback}
        onClickCallback={props.onBarCellClickCallback}
      >
        <Box sx={cell} />
      </GridItem>
    ));
  };

  const CellsIndex = (props) => {
    return props.cellsIndex.map((cell, index) => {
      let newIndex = index + 1;
      newIndex = newIndex === 1 || newIndex % 5 === 0 ? newIndex : "";

      return (
        <GridItem index={index}>
          <Box sx={{ ...cell }}>
            <Text text={newIndex} />
          </Box>
        </GridItem>
      );
    });
  };

  return (
    <Grid data_id="bar-component" style={barStyle}>
      <Stars
        rating={props.bar}
        onBarCellHoverCallback={props.onBarCellHoverCallback}
        onBarCellClickCallback={props.onBarCellClickCallback}
      />
    </Grid>
  );
};

const createInitialCell = () => {
  return barCellConfig;
};

const createInitialCellIndex = () => {
  const newBarCellConfig = {
    ...barCellConfig,
    width: calcCellWidth(2),
  };
  delete newBarCellConfig.border;
  delete newBarCellConfig.backgroundColor;
  return newBarCellConfig;
};

const createInitialBarIndex = () => {
  return Array(10)
    .fill()
    .map(() => createInitialCellIndex());
};

const createInitialBar = () => {
  return Array(10)
    .fill()
    .map(() => createInitialCell());
};

const FeedbackComponent = styled(MUIGrid)(({ children, theme, ...otherProps }) => ({
  container: true,
  width: "60%",
  height: "90vh",
  margin: "auto",
  ...otherProps,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "cetner",
  backgroundColor: theme.palette.background.default,
}));

const ButtonsComponent = styled(MUIGrid)(({ children, ...otherProps }) => ({
  container: true,
  width: "100%",
  display: "flex",
  flexDirection: "row",
  ...otherProps,
  justifyContent: "space-evenly",
  alignItems: "center",
}));

const RaterComponent = (props) => {
  const style = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    height: "20%",
  };

  return (
    <Grid rowGap={3} style={style} data_id="rater-component">
      {props.children}
    </Grid>
  );
};

const CommentsComponent = styled(Grid)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  height: "50%",
  color: theme.palette.primary.light.main,
  margin: "auto",
  container: true,
  rowGap: 10,
}));

const CommentBoxComponent = styled(MUITextField)(({ theme, comments, handleCommentsChange, ...otherProps }) => ({
  gridRow: true,
  width: "60%",
  color: theme.palette.primary.light.main,
  border: `6px solid white`,
  borderRadius: "6px",
  overflow: "hidden",
  margin: "auto",
  value: comments,
  // handleChange: handleCommentsChange,
  ...otherProps,
}));

const DecisionComponent = styled(MUIGrid)(() => ({
  display: "flex",
  flexDirection: "column",
  // justifyContent: "space-between",
  justifyContent: "center",
  alignItems: "center",
  height: "20%",
}));

const Feedback = (props) => {
  const { theme: style } = props;
  const theme = useTheme();

  const [bar, setBar] = useState(createInitialBar());
  const [barIndex, setBarIndex] = useState(createInitialBarIndex());
  const [curRating, setCurRating] = useState(-1);
  const [rating, setRating] = useState(curRating);
  const [comments, setComments] = useState("");
  const [reviewed, setReviewed] = useState(false);
  const [exit, setExit] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const { userState, userDispatch } = useContext(UserContext);
  const { messageState, messageDispatch } = useContext(MessageContext);
  const { restaurantState, restaurantDispatch } = useContext(RestaurantsContext);
  // const { navigationDispatch } = useContext(NavigationContext);

  const handleCommentsChange = (event) => {
    // const newComments = comments.split().join();
    const newComments = event.target.value;
    setComments(newComments);
  };

  const handleSubmiteReview = async (wouldGoAgain) => {
    if (rating === -1) return;
    await handleAddOrUpdateReview();
    // await handleAddOrUpdatePreference(wouldGoAgain);
    setReviewed(true);
  };

  const handleAddOrUpdateReview = () => {
    return new Promise(async (resolve, reject) => {
      let params = {
        restaurantID: restaurantState.restaurant.id,
        restaurantName: restaurantState.restaurant.name,
        email: userState.email,
        review: comments,
        rating: rating,
      };

      let res = await API.UserReviews.getReview({
        restaurantID: params.restaurantID,
        email: params.email,
      });
      const review = await API.apiResHandling(res, messageDispatch, res.message);
      if (review == null) {
        let res = await API.UserReviews.addReview(params);
        API.apiResHandling(res, messageDispatch, res.message);
      } else {
        if (review !== comments) {
          res = await API.UserReviews.updateReview(params);
          API.apiResHandling(res, messageDispatch, res.message);
        }
      }

      return resolve();
    });
  };

  const handleModalClick = () => {
    setModalOpen(false);
    navigate("/Profile");
  };

  useEffect(() => {
    if (reviewed) {
      setReviewed(false);
      setModalOpen(true);
      setMessage(`Thank you for the review`);
      // messageDispatch({
      //   type: UPDATE_MESSAGE,
      //   message: `Thank you for the review.`,
      //   onModalClick: () => navigate("/Profile"),
      // });
    }
  }, [messageDispatch, navigate, reviewed]);

  // const handleAddOrUpdatePreference = (wouldGoAgain) => {
  //   return new Promise(async (resolve, reject) => {
  //     let params = {
  //       restaurantID: restaurantState.restaurant.id,
  //       email: userState.email,
  //       review: comments,
  //     };

  //     // let preference = getFoodPreferences(restaurantState.restaurant.preference);
  //     // let like = wouldGoAgain ? "YES" : "NO";
  //     const like = wouldGoAgain;
  //     const location = restaurantState.location;
  //     const preference = restaurantState.restaurant.categories;

  //     params = {
  //       restaurantID: restaurantState.restaurant.id,
  //       email: userState.email,
  //       preference,
  //       location,
  //       like,
  //     };
  // let res = await API.Users.getRestaurantPreferences({
  //   restaurantID: params.restaurantID,
  //   email: params.email,
  // });
  // const preference_db = API.apiResHandling(res, messageDispatch, res.message);
  // if (preference_db != null) {
  //   // Merge the new preference with the preference from local database for the current user
  //   // If the user would go again add the current preference to the previous preferences for the restaurant
  //   if (preference !== preference_db && wouldGoAgain) {
  //     let mergedPreferenceArray = (preference + ", " + preference_db).split(", ");
  //     mergedPreferenceArray = Object.values(
  //       Object.fromEntries(mergedPreferenceArray.map((element) => [element, element]))
  //     );
  //     preference = getFoodPreferences(mergedPreferenceArray);
  //   }
  //   // If not, remove the current preferences from the preferences for the restaurant
  //   else if (!wouldGoAgain) {
  //     const preferenceArray = preference.split(",");
  //     preference = getFoodPreferences(preferenceArray);
  //   }
  //   params = {
  //     ...params,
  //     preference: preference,
  //   };

  //   // res = await API.Users.addRestaurantPreference(Object.values(params));
  //   res = await API.Users.updateRestaurantPreference(params);
  //   API.apiResHandling(res, messageDispatch, res.message);
  // } else {
  //   res = await API.Users.addRestaurantPreference(Object.values(params));
  //   API.apiResHandling(res, messageDispatch, res.message);
  // }
  //     return resolve();
  //   });
  // };

  const getCurrentRating = (cellIndex) => {
    return cellIndex * 2;
  };

  const onBarCellClickCallback = () => {
    setRating(curRating);
  };

  const onBarCellHoverCallback = (cellIndex) => {
    if (curRating === cellIndex) return;
    const newBar = bar.map((cell, index) => {
      if (index <= cellIndex) {
        const newCell = {
          ...cell,
          backgroundColor: "red",
          hovered: true,
        };
        return newCell;
      }
      return createInitialCell(index);
    });
    setBar(newBar);
    setCurRating(getCurrentRating(cellIndex));
  };

  return (
    <FeedbackComponent rowGap={5} theme={theme}>
      <RaterComponent>
        {/* <TextComponent text={"Rate you food:"} /> */}
        <RowComponent>
          <TextComponent fontSize={"200%"}>{"Rate your food: "}</TextComponent>
        </RowComponent>
        <BarComponent
          bar={bar}
          barIndex={barIndex}
          onBarCellHoverCallback={onBarCellHoverCallback}
          onBarCellClickCallback={onBarCellClickCallback}
        />
      </RaterComponent>
      <CommentsComponent>
        <RowComponent>
          <TextComponent fontSize={"200%"}>{"Comments: "}</TextComponent>
        </RowComponent>
        <CommentBoxComponent
          fullWidth
          multiline
          rows={5}
          comments={comments}
          // handleCommentsChange={() => handleCommentsChange}
          onChange={(e) => handleCommentsChange(e)}
        />
      </CommentsComponent>
      <DecisionComponent>
        <RowComponent>
          <TextComponent fontSize={"200%"}>{"Would You Go Again?"}</TextComponent>
        </RowComponent>
        <ButtonsComponent>
          <RoundButton onClick={() => handleSubmiteReview(false)}>
            <CloseIcon />
          </RoundButton>
          <RoundButton onClick={() => handleSubmiteReview(true)}>
            <CheckIcon />
          </RoundButton>
        </ButtonsComponent>
      </DecisionComponent>
      <Modal open={modalOpen} interactive={true} message={message} onClickCallback={handleModalClick} />
    </FeedbackComponent>
  );
};

export default Feedback;
