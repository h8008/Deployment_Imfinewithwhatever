import { Fragment, useState, useContext, useEffect } from "react";
import TextField from "../../ui_components/TextField";
import GridRow from "../../ui_components/GridRow";
import GridItem from "../../ui_components/GridItem";
import Text from "../../ui_components/Text";
import Form from "../../ui_components/Form";
import RoundButton from "../../ui_components/RoundButton";

import Grid from "@mui/material/Grid";
import styled from "@emotion/styled";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { UPDATE_CUISINE, UPDATE_LOCATION, UPDATE_RESTAURANTS } from "../../reducer/Main/actions";

import { RestaurantsContext } from "../../providers/RestaurantsProvider";
import { Box } from "@mui/material";
import { MessageContext } from "../../providers/MessageProvider";
import { UPDATE_MESSAGE } from "../../reducer/Message/MessageAction";
import {
  handleGetRestaurantsByCuisine,
  handleGetRestaurantByLocation,
  handleGetAggregatedRestaurantsData,
} from "./Helpers";
import { NAVIGATE } from "../../reducer/Navigator/actions";
import { NavigationContext } from "../../providers/NavigationProvider";
import { DehydrateContext } from "../../providers/DeHydrateProvider";
import { DEHYDRATE } from "../../reducer/Dehydrate/actions";
import { UserContext } from "../../providers/UserProvider";

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
      fullWidth={true}
      color="primary"
      focused={true}
      options={props.cuisines}
      onClick={props.handleCuisinesChange}
    />
  );
};

const MultipleIdeas = (props) => {
  const boxStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    border: "2px solid black",
    borderRadius: "5px",
    height: "66px",
  };

  const rowStyle = {
    width: "100%",
  };

  return (
    <GridRow style={rowStyle}>
      <Box sx={boxStyle}>
        <Text text={"Decide for me"} />
        <ArrowForwardIcon onClick={() => props.onMultipleIdeasCallback()} />
      </Box>
    </GridRow>
  );
};

const Components = (props) => {
  const rowStyle = {
    width: "60%",
    display: "flex",
    alignItems: "center",
  };

  const components = [
    <TextField fullWidth={true} color="primary" focused handleChange={props.handleLocationChange} />,
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
            <Text text={comp} color="error" />
          </GridItem>
          <GridItem
            style={{
              width: "80%",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            {components[index]}
          </GridItem>
        </GridRow>
      ))}
    </Fragment>
  );
};

const MainComponent = styled(Grid)({
  container: true,
  rowGap: 50,
  width: "90%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

function Main(props) {
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

  const { userState } = useContext(UserContext);
  const { restaurantDispatch } = useContext(RestaurantsContext);
  const { navigationDispatch } = useContext(NavigationContext);
  const { messageDispatch } = useContext(MessageContext);
  const { hydrateDispatch } = useContext(DehydrateContext);

  const [location, setLocation] = useState("");
  const [cuisineIdx, setCuisineIdx] = useState(undefined);
  const [selectedCuisines, setSelectedCuisines] = useState([]);

  const handleLocationChange = (event) => {
    const location = event.target.value;
    setLocation(location);
  };

  const handleCuisinesChange = (selectedCuisineIdx) => {
    const newSelectedCuisines = Object.keys(
      Object.fromEntries(
        [...selectedCuisines, cuisines[selectedCuisineIdx]].map((cuisine, index) => [cuisine, cuisine])
      )
    );
    console.log("selected cuisines", newSelectedCuisines);
    setSelectedCuisines(newSelectedCuisines);
  };

  const handleSubmitData = (mode) => {
    return new Promise(async (resolve, reject) => {
      if (location === "" && selectedCuisines.length === 0) {
        await messageDispatch({
          type: UPDATE_MESSAGE,
          message: "Please enter a location.",
        });
        return;
      }
      await restaurantDispatch({
        type: UPDATE_CUISINE,
        cuisines: selectedCuisines,
      });
      await restaurantDispatch({
        type: UPDATE_LOCATION,
        location: location,
      });

      let locationParams = { term: "restaurant", location: location };
      let cuisineParams = {
        term: "food",
        location: location,
        categories: await getFoodPreferences(selectedCuisines),
      };

      const restaurantByLocationResponse = await handleGetRestaurantByLocation(locationParams);
      const restaurantByCuisineResponse = await handleGetRestaurantsByCuisine(cuisineParams);
      const aggregatedRestaurantData = await handleGetAggregatedRestaurantsData(
        restaurantByLocationResponse,
        restaurantByCuisineResponse
      );

      let dispatchType = UPDATE_RESTAURANTS;
      let dispatchContent =
        aggregatedRestaurantData == null
          ? {
              businesses: [],
              region: {},
            }
          : aggregatedRestaurantData.restaurantsData;
      await restaurantDispatch({
        type: dispatchType,
        payload: {
          restaurantsData: dispatchContent.businesses,
          region: dispatchContent.region,
        },
      });

      await hydrateDispatch({
        type: DEHYDRATE,
        payload: {
          email: userState.email,
          data: dispatchContent,
          apiInterface: "Users",
          store: "User",
        },
      });

      return resolve();
    });
  };

  const handleDecideForMeButtonClick = async () => {
    await handleSubmitData("normal");
    await navigationDispatch({
      type: NAVIGATE,
      payload: {
        shouldNavigate: true,
        destination: "/MultiDecisioinMaker",
        options: { replace: true },
      },
    });
  };

  const handleGoButtonClick = async () => {
    await handleSubmitData("game");
    await navigationDispatch({
      type: NAVIGATE,
      payload: {
        shouldNavigate: true,
        destination: "/Restaurants",
      },
    });
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
