import { useContext, useState, useEffect } from "react";
import Grid from "../../ui_components/Grid";
import Text from "../../ui_components/Text";
import GridRow from "../../ui_components/GridRow";
import GridItem from "../../ui_components/GridItem";
import TextField from "../../ui_components/TextField";

import { Box, styled } from "@mui/material";

import { main_config } from "../../styles/shared";
import RoundButton from "../../ui_components/RoundButton";
import RowComponent from "../../ui_components/RowComponent";

import { UserContext } from "../../providers/UserProvider";
import { RestaurantsContext } from "../../providers/RestaurantsProvider";
import { MessageContext } from "../../providers/MessageProvider";

import API from "../../API_Interface";
import { UPDATE_MESSAGE } from "../../reducer/Message/MessageAction";
import { getFoodPreferences } from "../../utils/Functions";
import { useNavigate } from "react-router-dom";

import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { NAVIGATE } from "../../reducer/Navigation/actions";
import { NavigationContext } from "../../providers/NavigationProvider";

const calcCellWidth = (addon = 0) => {
  const cellBorderWidth = 1;
  const width = parseInt(main_config.width.slice(0, -3)) - cellBorderWidth * 2 + addon + "px";
  return width;
};

const barCellConfig = {
  height: "30px",
  width: calcCellWidth(),
  border: "1px solid black",
  margin: "0px",
  backgroundColor: "white",
  overflow: "hidden",
};

const TextComponent = (props) => {
  const style = {
    width: "100%",
    height: "30px",
    display: "flex",
    justifyContent: "flex-start",
  };

  return (
    <GridRow style={style}>
      <Text text={props.text} />
      {/* <TextField text={props.text} onChange={props.handleCommentsChange} /> */}
    </GridRow>
  );
};

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
    border: "2px solid black",
    width: calcRowWidth(10),
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
    <Grid data_id="bar-component" style={{}}>
      <GridRow style={rowStyle} data_id={"bar-component-cells"}>
        <Cells
          cells={props.bar}
          onBarCellHoverCallback={props.onBarCellHoverCallback}
          onBarCellClickCallback={props.onBarCellClickCallback}
        />
      </GridRow>
      <GridRow style={() => ({ ...rowStyle, border: undefined })} data_id={"bar-component-cells-index"}>
        <CellsIndex cellsIndex={props.barIndex} />
      </GridRow>
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

const CommentsComponent = (props) => {
  const style = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    height: "20%",
  };

  return (
    <Grid rowGap={3} style={style} data_id={"comments-component"}>
      {props.children}
    </Grid>
  );
};

const CommentBoxComponent = (props) => {
  const style = {
    // border: '3px solid black',
    rows: 10,
    width: parseInt(props.style.width.slice(0, -2)) - 6 + "px",
    overflow: "hidden",
  };

  return <TextField value={props.comments} handleChange={props.handleCommentsChange} style={style} />;
};

const DecisionComponent = styled(GridRow)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  height: "20%",
}));

const Feedback = (props) => {
  const { theme } = props;
  const [bar, setBar] = useState(createInitialBar());
  const [barIndex, setBarIndex] = useState(createInitialBarIndex());
  const [curRating, setCurRating] = useState(-1);
  const [rating, setRating] = useState(curRating);
  const [comments, setComments] = useState("");
  const [reviewed, setReviewed] = useState(false);
  const [exit, setExit] = useState(false);

  const navigate = useNavigate();

  const { userState, userDispatch } = useContext(UserContext);
  const { messageState, messageDispatch } = useContext(MessageContext);
  const { restaurantState, restaurantDispatch } = useContext(RestaurantsContext);
  const { navigationDispatch } = useContext(NavigationContext);

  const handleCommentsChange = (event) => {
    // const newComments = comments.split().join();
    const newComments = event.target.value;
    console.log("new comments", newComments);
    setComments(newComments);
  };

  const handleSubmiteReview = async (wouldGoAgain) => {
    if (rating === -1) return;
    console.log("rating", rating);
    console.log("comments", comments);

    await handleAddOrUpdateReview();
    await handleAddOrUpdatePreference(wouldGoAgain);
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
      const review = API.apiResHandling(res, messageDispatch, res.message);
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

  useEffect(() => {
    const handleReviewEndNavigate = () => {
      navigationDispatch({
        type: NAVIGATE,
        payload: {
          destination: "/Profile",
        },
      });
    };

    if (reviewed) {
      setReviewed(false);
      messageDispatch({
        type: UPDATE_MESSAGE,
        message: `Thank you for the review.`,
        onModalClick: handleReviewEndNavigate,
      });
    }
  }, [messageDispatch, navigationDispatch, reviewed]);

  const handleAddOrUpdatePreference = (wouldGoAgain) => {
    return new Promise(async (resolve, reject) => {
      let params = {
        restaurantID: restaurantState.restaurant.id,
        email: userState.email,
        review: comments,
      };

      let preference = getFoodPreferences(restaurantState.restaurant.preference);
      let like = wouldGoAgain ? "YES" : "NO";

      params = {
        restaurantID: restaurantState.restaurant.id,
        email: userState.email,
        preference: preference,
        like: like,
      };
      let res = await API.Users.getRestaurantPreferences({
        restaurantID: params.restaurantID,
        email: params.email,
      });
      const preference_db = API.apiResHandling(res, messageDispatch, res.message);
      if (preference_db != null) {
        // Merge the new preference with the preference from local database for the current user
        // If the user would go again add the current preference to the previous preferences for the restaurant
        if (preference !== preference_db && wouldGoAgain) {
          let mergedPreferenceArray = (preference + ", " + preference_db).split(", ");
          mergedPreferenceArray = Object.values(
            Object.fromEntries(mergedPreferenceArray.map((element) => [element, element]))
          );
          preference = getFoodPreferences(mergedPreferenceArray);
        }
        // If not, remove the current preferences from the preferences for the restaurant
        else if (!wouldGoAgain) {
          const preferenceArray = preference.split(",");
          preference = getFoodPreferences(preferenceArray);
        }
        params = {
          ...params,
          preference: preference,
        };

        console.log("params", params);

        // res = await API.Users.addRestaurantPreference(Object.values(params));
        res = await API.Users.updateRestaurantPreference(params);
        API.apiResHandling(res, messageDispatch, res.message);
      } else {
        res = await API.Users.addRestaurantPreference(Object.values(params));
        API.apiResHandling(res, messageDispatch, res.message);
      }
      return resolve();
    });
  };

  const onBarCellClickCallback = () => {
    setRating(curRating + 1);
  };

  const onBarCellHoverCallback = (cellIndex) => {
    // console.log("index", cellIndex);
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
    setCurRating(cellIndex);
  };

  return (
    <Grid rowGap={5} style={theme}>
      <RaterComponent>
        <TextComponent text={"Rate you food:"} />
        <BarComponent
          bar={bar}
          barIndex={barIndex}
          onBarCellHoverCallback={onBarCellHoverCallback}
          onBarCellClickCallback={onBarCellClickCallback}
        />
      </RaterComponent>
      <CommentsComponent>
        <TextComponent text={"Comments:"} />
        <CommentBoxComponent style={theme} comments={comments} handleCommentsChange={handleCommentsChange} />
      </CommentsComponent>
      <DecisionComponent>
        <TextComponent text={"Would you go again?"} />
        <RowComponent theme={{ justifyContent: "space-between", alignItems: "center" }}>
          <RoundButton onClick={() => handleSubmiteReview(false)}>
            <CloseIcon />
          </RoundButton>
          <RoundButton onClick={() => handleSubmiteReview(true)}>
            <CheckIcon />
          </RoundButton>
        </RowComponent>
      </DecisionComponent>
    </Grid>
  );
};

export default Feedback;
