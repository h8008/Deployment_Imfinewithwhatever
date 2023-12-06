import { Fragment, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router";

import GridRow from "../../ui_components/GridRow";
import GridItem from "../../ui_components/GridItem";
import Text from "../../ui_components/Text";
import Form from "../../ui_components/Form";
import RoundButton from "../../ui_components/RoundButton";

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import MultiDecisionMaker from "../multiDecisionMaker/MultiDecisionMaker";

import { main_config } from "../../styles/shared";
import styled from "@emotion/styled";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { UPDATE_CUISINE, UPDATE_LOCATION, UPDATE_RESTAURANTS } from "../../reducer/Main/actions";

import { RestaurantsContext } from "../../providers/RestaurantsProvider";
import API from "../../API_Interface";
import { Box, useTheme } from "@mui/material";
import { MessageContext } from "../../providers/MessageProvider";
import { UPDATE_MESSAGE } from "../../reducer/Message/MessageAction";
import { GameContext } from "../../providers/GameProvider";

import useStealRestaurantsFromYelp from "../../hooks/API/Restaurants";
import { getRestaurantsByCuisines, getRestaurantsByLocations } from "../../utils/axios/restaurants";

const useHandleTransitionToRestaurants = (restaurants, next) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (Object.keys(restaurants).length > 0 && restaurants.businesses.length > 0 && next === "Restaurants") {
      navigate("/Restaurants", { state: { restaurants: restaurants.businesses } });
    }
  }, [navigate, next, restaurants]);
};

const useHandleTransitionToGames = (restaurants, next) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (Object.keys(restaurants).length > 0 && restaurants.businesses.length > 0 && next === "Games") {
      navigate("/MultiDecisionMaker", { state: { restaurants: restaurants.businesses } });
    }
  }, [navigate, next, restaurants]);
};

const getFoodPreferences = (categories) => {
  const lowercased_categories = categories.map((category) => {
    const charArray = category.split().map((char, index) => {
      if (index === 0) {
        return char.toLowerCase();
      }
      return char;
    });
    return charArray.join(",");
  });
  return lowercased_categories.reduce((string, category, categoryIdx) => `${string}${category},`, ``).slice(0, -1);
};

const CuisineSliders = (props) => {
  return (
    <Form
      fullWidth="true"
      color="primary"
      focused="true"
      options={props.cuisines}
      onClick={props.handleCuisinesChange}
    />
  );
};

const MultipleIdeas = (props) => {
  const rowStyle = {
    width: "100%",
  };

  return (
    <GridRow style={rowStyle}>
      <GameInputComponent>
        <Text text={"Decide for me"} />
        <ArrowForwardIcon onClick={() => props.onMultipleIdeasCallback()} />
      </GameInputComponent>
    </GridRow>
  );
};

const Components = (props) => {
  const rowStyle = {
    width: "60%",
    display: "flex",
    alignItems: "center",
  };

  const theme = useTheme();
  const borderColor = theme.palette.primary.light.main;

  const components = [
    <TextField
      fullWidth={true}
      focused
      onChange={(e) => props.handleLocationChange(e)}
      sx={{
        "& .MuiInputLabel-root": { color: theme.palette.primary.light.main },
        border: `1px solid ${borderColor}`,
        borderRadius: 2,
        height: "50px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      InputProps={{ disableUnderline: true }}
      variant="standard"
    />,
    <CuisineSliders
      cuisines={props.cuisines}
      cuisine={props.cuisine}
      handleCuisinesChange={props.handleCuisinesChange}
    />,
    <MultipleIdeas
      games={props.games}
      onMultipleIdeasCallback={props.onMultipleIdeasCallback}
      restaurantDispatch={props.restaurantDispatch}
    />,
  ];

  return (
    <Fragment>
      {props.components.map((comp, index) => (
        <GridRow columns={12} columnGap={20} style={rowStyle} color="primary">
          <GridItem style={{ width: "20%" }}>
            <Text text={comp} color={theme.palette.primary.light.main} />
          </GridItem>
          <GridItem style={{ width: "80%", display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
            {components[index]}
          </GridItem>
        </GridRow>
      ))}
    </Fragment>
  );
};

const MainComponent = styled(Grid)(({ theme }) => ({
  container: true,
  backgroundColor: theme.palette.background.default,
  position: "relative",
  height: "90vh",
  width: "75vw",
  margin: "auto",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  rowGap: 50,
  invisible: false,
}));

const GameInputComponent = styled(Box)(({ theme, chidlren, ...otherProps }) => ({
  color: theme.palette.primary.light.main,
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  border: "2px solid black",
  borderRadius: "5px",
  height: "50px",
}));

function Main(props) {
  console.log("Main Page");
  const navigate = useNavigate();

  const components = ["Location", "What kind of food?", "Multiple Ideas ?"];
  const cuisines = [
    "Mexican",
    "Japanese",
    "Filipino",
    "Burgers",
    "Italian",
    "Chinese",
    "BBQ",
    "Asian",
    "American",
    "Pizza",
  ];

  const games = ["Plinko", "Wheel", "Coin"];

  const { restaurantDispatch } = useContext(RestaurantsContext);
  const { gameDispatch } = useContext(GameContext);

  const { messageDispatch } = useContext(MessageContext);

  const [location, setLocation] = useState("");
  const [cuisineIdx, setCuisineIdx] = useState(undefined);
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [restaurants, setRestaurants] = useState({});
  const [next, setNext] = useState("");

  useStealRestaurantsFromYelp(restaurants);
  useHandleTransitionToGames(restaurants, next);
  useHandleTransitionToRestaurants(restaurants, next);

  const handleLocationChange = (event) => {
    const location = event.target.value;
    setLocation(location);
  };

  const handleCuisinesChange = (selectedCuisineIdx) => {
    // console.log("selected cuisines", cuisines[selectedCuisineIdx]);
    const newSelectedCuisines = Object.keys(
      Object.fromEntries(
        [...selectedCuisines, cuisines[selectedCuisineIdx]].map((cuisine, index) => [cuisine, cuisine])
      )
    );
    setSelectedCuisines(newSelectedCuisines);
  };

  const handleSubmitData = (next) => {
    return new Promise(async (resolve, reject) => {
      if (location === "" && selectedCuisines.length === 0) {
        messageDispatch({
          type: UPDATE_MESSAGE,
          message: "Please enter a location.",
        });
        return;
      }

      // await restaurantDispatch({
      //   type: UPDATE_CUISINE,
      //   cuisines: selectedCuisines,
      // });

      // await restaurantDispatch({
      //   type: UPDATE_LOCATION,
      //   location: location,
      // });

      // const location_params = { term: "restaurant", location: location };
      // const restaurant_by_location_response = await API.YelpAPI.getRestaurantsByLocation(location_params);
      // let restaurantsByLocationData = {};
      // if (restaurant_by_location_response.status === "OK") {
      //   restaurantsByLocationData = await {
      //     ...restaurantsByLocationData,
      //     ...restaurant_by_location_response.restaurantsData,
      //   };
      // }

      // const cuisin_params = {
      //   term: "food",
      //   location: location,
      //   categories: await getFoodPreferences(selectedCuisines),
      // };
      // let restaurant_by_cuisine_response = await API.YelpAPI.getRestaurantsByCuisine(cuisin_params);
      // if (restaurant_by_cuisine_response.status === "OK") {
      //   const aggregatedRestaurantData = await {
      //     ...restaurantsByLocationData,
      //     ...restaurant_by_cuisine_response.restaurantsData,
      //   };

      //   const restaurants = aggregatedRestaurantData.businesses;
      //   setRestaurants(restaurants);

      //   await restaurantDispatch({
      //     type: UPDATE_RESTAURANTS,
      //     payload: {
      //       restaurantsData: restaurants,
      //       location: location,
      //     },
      //   });
      // }

      const locationRes = await getRestaurantsByLocations(location);
      const cuisinesRes = await getRestaurantsByCuisines(selectedCuisines, location);
      const aggregatedRestaurantData = await {
        ...locationRes,
        ...cuisinesRes,
      };
      // const restaurants = aggregatedRestaurantData.businesses;
      const restaurants = aggregatedRestaurantData;
      setRestaurants(restaurants);

      // console.log("restaurants", aggregatedRestaurantData);

      await restaurantDispatch({
        type: UPDATE_CUISINE,
        cuisines: selectedCuisines,
      });

      await restaurantDispatch({
        type: UPDATE_LOCATION,
        location: location,
      });

      return resolve();
    });
  };

  const handleDecideForMeButtonClick = async () => {
    await handleSubmitData("MultiDecisionMaker");
  };

  const handleGoButtonClick = async () => {
    await handleSubmitData("Restaurants");
  };

  return (
    <MainComponent data_id="main-page">
      {
        <Components
          components={components}
          cuisines={cuisines}
          cuisine={cuisines[cuisineIdx]}
          handleLocationChange={handleLocationChange}
          handleCuisinesChange={handleCuisinesChange}
          games={games}
          onMultipleIdeasCallback={handleDecideForMeButtonClick}
          restaurantDispatch={restaurantDispatch}
        />
      }
      <RoundButton onClick={handleGoButtonClick}>
        <Text text="GO" />
      </RoundButton>
    </MainComponent>
  );
}

export default Main;
