import { useState, useContext, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FormControl, Grid, Tabs, Tab } from "@mui/material";
import { Scrollbar } from "react-scrollbars-custom";

import Text from "../../ui_components/Text";
import TextField from "../../ui_components/TextField";
import styled from "@emotion/styled";
import GridRow from "../../ui_components/GridRow";
import RoundButton from "../../ui_components/RoundButton";
import attributes from "../../config";
import Checkboxes from "../../ui_components/Checkbox";
import Dropdown from "../../ui_components/Dropdown";

import { MessageContext } from "../../providers/MessageProvider";
import { RestaurantsContext } from "../../providers/RestaurantsProvider";
import { GameContext } from "../../providers/GameProvider";

import { UPDATE_MESSAGE } from "../../reducer/Message/MessageAction";
import { UPDATE_RESTAURANTS_FOR_GAMES } from "../../reducer/Game/GameActions";
import { UPDATE_RESTAURANT, UPDATE_RESTAURANTS } from "../../reducer/Main/actions";
import { useFetchYelpRestaurants } from "../../hooks/API/Restaurants";

const GridRowStyle = (display) => {
  const newdisplay =
    display == null
      ? {
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
        }
      : { ...display };
  return {
    display: "flex",
    ...newdisplay,
  };
};

const ButtonsComponents = styled(Grid)(() => ({
  width: "60%",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
}));

const RowGridComponent = styled(Grid)(({ children, ...otherProps }) => ({
  container: true,
  gridRow: true,
  ...otherProps,
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}));

const RowComponent = styled(Grid)((props) => ({
  gridRow: true,
  color: "primary",
  display: "flex",
  width: "100%",
  flexDirection: props.flexDirection ? props.flexDirection : "row",
  justifyContent: props.flexDirection ? props.flexDirection : "center",
  alignItems: "center",
  data_id: "row-component",
  columnGap: 20,
}));

const RestaurantsInputComponent = styled(Grid)({
  display: "flex",
  flexDirection: "column",
  container: true,
  height: "45%",
  rowGap: 20,
  width: "95%",
});

const RestaurantsInput = (props) => {
  const { restaurantInputs, handleChange, handleAddRestaurantInput, handleRemoveRestaurantInput, restaurants, flex } =
    props;

  return (
    <RowGridComponent flex={flex} rowGap={20}>
      <RowComponent>
        <Text text={"Enter Restaurants"} />
      </RowComponent>
      <Scrollbar style={{ width: 700, height: 300 }}>
        <RestaurantsInputComponent autoFocus={true} rowGap={20} data_id={"restaurant-input-component"}>
          <Dropdown inputs={restaurantInputs} options={restaurants} handleChange={handleChange} />
        </RestaurantsInputComponent>
      </Scrollbar>
      <ButtonsComponents>
        <RowComponent onClick={() => handleAddRestaurantInput()}>
          <Text text={"+"} />
          <TextField value={"add more"} />
        </RowComponent>
        <RowComponent onClick={() => handleRemoveRestaurantInput()}>
          <Text text={"-"} />
          <TextField value={"remove last"} />
        </RowComponent>
      </ButtonsComponents>
    </RowGridComponent>
  );
};

const GamesInputComponent = (props) => {
  const { games, checked, onSelectGameCallback, flex } = props;

  return (
    <RowComponent flex={flex} flexDirection={"column"}>
      <RowComponent>
        <Text text={"Select Game"} />
      </RowComponent>
      <RowComponent>
        <Checkboxes
          labels={games}
          checked={checked}
          onSelectGameCallback={onSelectGameCallback}
          style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}
        />
      </RowComponent>
    </RowComponent>
  );
};

const BackdropComponent = styled(Grid)(({ theme }) => ({
  container: true,
  backgroundColor: "grey",
  height: "100vh",
  width: "100vw",
  zIndex: -2,
  position: "relative",
}));

const ContentComponent = styled(Grid)(({ theme }) => ({
  container: true,
  backgroundColor: theme.palette.warning.main,
  height: "90%",
  width: "75vw",
  margin: "auto",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  invisible: false,
  position: "absolute",
  zIndex: "1",
  top: "50%",
  left: "50%",
  transform: `translate(-50%, -50%)`,
}));

// For the benefit of easily adding additional styles to the default mui components
// by using the styled function
const MultiDecisionMakerComponent = styled(Grid)(({ children, theme, ...otherProps }) => ({
  container: true,
  rowGap: 20,
  height: "100vh",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",
  alignItems: "flex-start",
  ...otherProps,
}));

const createInitialRestaurants = (num) => {
  return Array(num)
    .fill()
    .map(() => [{}]);
};

const useIntializeOptions = (initialOptions) =>
  useMemo(() => (initialOptions ? [initialOptions] : []), [initialOptions]);

const useLocationState = () => {
  const location = useLocation();
  const restaurants = useMemo(
    () => (location.state && location.state.restaurants ? location.state.restaurants : {}),
    [location.state]
  );
  return restaurants;
};

const useInitializeRestaurants = (sources) => {
  // const restaurants = useMemo(() => sources.filter((src, i) => src.length > 0), [sources]);

  const filtered = sources.filter((src) => src.length > 0);
  const restaurants = useMemo(() => (filtered.length > 0 ? filtered : [{ businesses: [] }]), [filtered]);

  return restaurants[0];
};

const MultiDecisionMaker = (props) => {
  const games = attributes.games.names;
  const navigate = useNavigate();
  // const location = useLocation();

  const { messageState, messageDispatch } = useContext(MessageContext);
  const { restaurantState, restaurantDispatch } = useContext(RestaurantsContext);
  const { gameState, gameDispatch } = useContext(GameContext);

  const sourceOne = useLocationState();
  const sourceTwo = restaurantState.restaurantsData;
  const sourceThree = useFetchYelpRestaurants(sourceOne);

  const restaurants = useInitializeRestaurants([
    sourceOne,
    sourceTwo != null ? sourceTwo : [],
    sourceThree != null ? sourceThree : [],
  ]);

  const [numRestaurants, setNumRestaurants] = useState(3);
  const [restaurantInputs, setRestaurantInputs] = useState(createInitialRestaurants(numRestaurants));
  const [restaurantOptions] = useIntializeOptions(restaurants);
  const [selectedGame, setSelectedGame] = useState("");
  const [checked, setChecked] = useState(games.map(() => false));

  const onSelectGameCallback = (game, gameIndex) => {
    const newChecked = checked.map((bool, index) => {
      if (index === gameIndex) return true;
      if (index !== gameIndex) return false;
      return bool;
    });

    setChecked(newChecked);
    setSelectedGame(game);
  };

  const handleGoButtonClick = () => {
    // Game start requires at least three valid restaurant inputs that are not empty strings
    if (restaurantInputs.length < 3 && restaurantInputs.some((input) => input !== "")) {
      return;
    }
    if (restaurantInputs.every((restaurant) => restaurant === "")) return;
    if (selectedGame === "") return;

    const gameData = restaurantInputs.filter((restaurant) => Object.keys(restaurant).length !== 0);
    navigate(`/Games/${selectedGame}`, { state: { data: gameData } });

    // messageDispatch({
    //   type: UPDATE_MESSAGE,
    //   message: "Start game ?",
    //   interactive: true,
    //   onModalClick: handleGameStart,
    // });
  };

  const handleGameStart = (gameStart = true) => {
    if (gameStart) {
      if (restaurantInputs.every((restaurant) => restaurant === "")) return;
      if (selectedGame === "") return;

      const filteredRestaurantInputs = restaurantInputs.filter((restaurant) => Object.keys(restaurant).length !== 0);

      const handleGameEndCallback = (selectedItem) => {
        // Note the selectedItem returned by the games is a restaurant data object
        restaurantDispatch({
          type: UPDATE_RESTAURANTS,
          payload: {
            restaurantsData: [selectedItem],
          },
        });

        messageDispatch({
          type: UPDATE_MESSAGE,
          message: `you selected ${selectedItem.name}`,
          onModalClick: () => navigate("/Restaurants"),
        });
      };

      gameDispatch({
        type: UPDATE_RESTAURANTS_FOR_GAMES,
        payload: {
          restaurants: filteredRestaurantInputs,
          onGameEndCallback: handleGameEndCallback,
        },
      });

      console.log("game started");
      navigate(`/Games/${selectedGame}`, { replace: true });
    }
  };

  const handleRestaurantChange = (index, restaurant) => {
    const newRestaurantInputs = [...restaurantInputs];
    newRestaurantInputs[index] = { ...restaurant };
    setRestaurantInputs(newRestaurantInputs);
  };

  const handleAddRestaurantInput = (input) => {
    // const newRestaurantInputs = [...restaurantInputs, [""]];
    const newRestaurantInputs = [...restaurantInputs, [""]];
    setRestaurantInputs(newRestaurantInputs);
  };

  const handleRemoveRestaurantInput = () => {
    if (restaurantInputs.length === 3) {
      return;
    }
    const newRestaurantInputs = [...restaurantInputs];
    newRestaurantInputs.pop();
    setRestaurantInputs(newRestaurantInputs);
  };

  return (
    <MultiDecisionMakerComponent>
      <BackdropComponent />
      <ContentComponent>
        <RestaurantsInput
          flex={"70%"}
          restaurantInputs={restaurantInputs}
          handleChange={handleRestaurantChange}
          handleAddRestaurantInput={handleAddRestaurantInput}
          handleRemoveRestaurantInput={handleRemoveRestaurantInput}
          restaurants={restaurantOptions}
        />
        <GamesInputComponent flex={"20%"} games={games} checked={checked} onSelectGameCallback={onSelectGameCallback} />
        <RowComponent>
          <RowComponent display={{ justifyContent: "center" }}>
            <RoundButton onClick={handleGoButtonClick}>
              <Text text="Go!" />
            </RoundButton>
          </RowComponent>
        </RowComponent>
      </ContentComponent>
    </MultiDecisionMakerComponent>
  );
};

export default MultiDecisionMaker;
