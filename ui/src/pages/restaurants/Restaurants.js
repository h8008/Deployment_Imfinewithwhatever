import { useContext, useEffect, useMemo, useState } from "react";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import styled from "@emotion/styled";
import RoundButton from "../../ui_components/RoundButton";
import Text from "../../ui_components/Text";
import SwipeableTemporaryDrawer from "../../ui_components/SwipeableDrawer2";

import Restaurant from "../../components/Restaurant";

import { RestaurantsContext } from "../../providers/RestaurantsProvider";
import { UserContext } from "../../providers/UserProvider";
import { NavigationContext } from "../../providers/NavigationProvider";

import { UPDATE_RESTAURANT, UPDATE_RESTAURANTS } from "../../reducer/Main/actions";
import { NAVIGATE } from "../../reducer/Navigation/actions";

import { RESTAURANTS_DATA_EMPTY_MESSAGE } from "../../constants/Messages";

import useDetectEmptyData from "../../hooks/useDetectEmptyData";
import useDispatchMessage from "../../hooks/useDispatchMessage";

import API from "../../API_Interface";
import { BackgroundDispatchContext } from "../../providers/BackgroundDispatchProvider";
import { AssetsContext } from "../../providers/AssetsProvider";

import { useTheme } from "@mui/material";

const RestaurantsComponent = styled(Grid)(({ theme }) => ({
  width: "90%",
  height: "90vh",
  margin: "auto",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  flexWrap: "wrap",
  backgroundColor: theme.palette.background.default,
}));

const ButtonsComponent = styled(Grid)({
  container: true,
  width: "60%",
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  flexDirection: "row",
});

const RestaurantComponent = styled(Grid)({
  width: "60%",
  height: "75%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  backgroundColor: "white",
});

// Filters the list of restaurants from Yelp API based on the blacklist stored
// in the User global state which was retrieved from the database at login
const filterRestaurantsByBlackList = (blacklist, restaurants) => {
  const blacklistObject = Object.fromEntries(
    blacklist.filter((item) => item.like === "NO").map((item) => [item.restaurantID, item.restaurantID])
  );
  return restaurants.filter((restaurant) => blacklistObject[restaurant.id] == null);
};

const useInitializeRestaurants = (intialBlacklist, initialRestaurants) => {
  const initializeRestaurants = useMemo(() => {
    if (intialBlacklist.length > 0 && initialRestaurants.length > 0) {
      return filterRestaurantsByBlackList([...intialBlacklist], [...initialRestaurants]);
    }
    if (initialRestaurants.length > 0) {
      return [...initialRestaurants];
    }
    return [];
  }, [intialBlacklist, initialRestaurants]);

  const restaurantsData = initializeRestaurants;
  return [restaurantsData];
};

const useInitializeActiveRestaurant = (restaurants, activeRestaurantIdx) => {
  const restaurant = useMemo(
    () => (restaurants == null ? undefined : restaurants[activeRestaurantIdx]),
    [restaurants, activeRestaurantIdx]
  );
  return [restaurant];
};

const initializeVerdicts = (restaurants, pos, v) => {
  return restaurants != null && restaurants.length > 0
    ? new Array(restaurants.length).fill("neutral").map((verdict, index) => (index === pos ? v : verdict))
    : [];
};

const initializeMessage = () => "";

const useRecordVerdictsOnPageChange = (verdicts, restaurants, email, ready) => {
  const getCategories = (categories) => categories.map((cat) => cat.title);
  useEffect(() => {
    if (ready) {
      const add = async (verdict, restaurant, email) => {
        const res = await API.Preference.add({
          restaurant_id: restaurant.id,
          categories: getCategories(restaurant.categories),
          email: email,
          like: verdict,
        });
        if (res.status !== "OK") {
        }
      };
      verdicts
        .filter((v) => v !== "neutral")
        .forEach((v, idx) => {
          add(v, restaurants[idx], email);
        });
    }
  }, [email, restaurants, verdicts, ready]);
};

const updateVerdicts = (verdicts, activeRestaurantIdx, verdict) => {
  const v = [...verdicts];
  v[activeRestaurantIdx] = verdict;
  return v;
};

const Restaurants = (props) => {
  const theme = useTheme();
  const { assets } = useContext(AssetsContext);
  const { restaurantState, restaurantDispatch } = useContext(RestaurantsContext);
  const { navigationState, navigationDispatch } = useContext(NavigationContext);
  const { backgroundDispatch } = useContext(BackgroundDispatchContext);
  const { userState, userDispatch } = useContext(UserContext);

  const restaurantsData = restaurantState.restaurantsData;
  const blacklistData = userState.preferences;

  const [message, setMessage] = useState(initializeMessage());
  const [preference, setPreference] = useState(null);
  const [modelOpen, setModalOpen] = useState(preference);
  const [activeRestaurantIdx, setActiveRestaurantIdx] = useState(0);
  const [restaurants] = useInitializeRestaurants(blacklistData, restaurantsData);
  const [activeRestaurant] = useInitializeActiveRestaurant(restaurantsData, activeRestaurantIdx);
  const [verdicts, setVerdicts] = useState(initializeVerdicts(restaurants, activeRestaurantIdx, preference));
  const [showActiveRestaurantLocation, setShowActiveRestaurantLocation] = useState(false);
  const [dispatchVerdicts, setDispatchVerdicts] = useState(false);

  // useDetectEmptyData(RESTAURANTS_DATA_EMPTY_MESSAGE, restaurantsData, restaurantsData == [], "/Main");
  useRecordVerdictsOnPageChange(verdicts, restaurants, userState.email, dispatchVerdicts);
  useDispatchMessage(message);

  const onShowRestaurantLocationCallback = () => {
    setShowActiveRestaurantLocation(true);
  };

  const handleDoneSettingPreference = () => {
    setDispatchVerdicts(true);
    navigationDispatch({
      type: NAVIGATE,
      payload: {
        destination: "/Feedback",
      },
    });
  };

  const onDecisionCallback = async (preference) => {
    if (preference) {
      updateActiveRestaurant(activeRestaurantIdx, "preference", [...restaurantState.cuisines]);
    } else {
      const newActiveRestaurantIdx = advanceActiveRestaurantIdx(activeRestaurantIdx);
      updateActiveRestaurant(newActiveRestaurantIdx, "preference", [...restaurantState.cuisines]);
    }
    setPreference(String(preference));
    setVerdicts(updateVerdicts(verdicts, activeRestaurantIdx, String(preference)));
  };

  const toggleModal = () => {
    setModalOpen(!modelOpen);
  };

  const updateActiveRestaurant = (newActiveRestaurantIdx, newProperty, newValue) => {
    const newActiveRestaurant = {
      ...restaurants[newActiveRestaurantIdx],
      [newProperty]: newValue,
    };
    const newRestaurants = restaurants.map((restaurant, index) => {
      if (index === newActiveRestaurantIdx) {
        return newActiveRestaurant;
      }
      return { ...restaurant };
    });

    setActiveRestaurantIdx(newActiveRestaurantIdx);

    restaurantDispatch({
      type: UPDATE_RESTAURANT,
      restaurant: { ...newActiveRestaurant },
    });

    restaurantDispatch({
      type: UPDATE_RESTAURANTS,
      payload: {
        restaurantsData: [...newRestaurants],
      },
    });
  };

  const handleViewPrevRestaurant = () => {
    const newActiveRestaurantIdx = activeRestaurantIdx - 1 <= -1 ? restaurants.length - 1 : activeRestaurantIdx - 1;
    updateActiveRestaurant(newActiveRestaurantIdx);
  };

  const handleViewNextRestaurant = () => {
    const newActiveRestaurantIdx = (activeRestaurantIdx + 1) % restaurants.length;
    updateActiveRestaurant(newActiveRestaurantIdx);
  };

  const advanceActiveRestaurantIdx = (activeRestaurantIdx) => {
    return (activeRestaurantIdx + 1) % restaurants.length;
  };

  const rollbackActiveRestaurantIdx = (activeRestaurantIdx) => {
    return activeRestaurantIdx - 1 <= -1 ? restaurants.length - 1 : activeRestaurantIdx - 1;
  };

  return (
    <RestaurantsComponent backdrop={assets[5]}>
      <ButtonsComponent>
        <Icon fontSize="large" color={theme.palette.primary.contrastText} onClick={handleViewPrevRestaurant}>
          <KeyboardDoubleArrowLeftIcon />
        </Icon>
        <Icon fontSize="large" color={theme.palette.primary.contrastText} onClick={handleViewNextRestaurant}>
          <KeyboardDoubleArrowRightIcon />
        </Icon>
      </ButtonsComponent>
      {activeRestaurant != null && (
        <Restaurant
          index={activeRestaurantIdx}
          restaurantData={{ ...activeRestaurant }}
          onShowRestaurantLocationCallback={onShowRestaurantLocationCallback}
          showLocation={showActiveRestaurantLocation}
          email={userState.email}
          modalOpen={modelOpen}
          updateActiveRestaurant={updateActiveRestaurant}
          toggleModal={toggleModal}
          onDecisionCallback={onDecisionCallback}
        />
      )}
      {/* {activeRestaurant && (
        <MapBox coordinates={activeRestaurant.coordinates} style={{ width: "500px", height: "500px" }} />
      )} */}
      <RoundButton onClick={handleDoneSettingPreference}>
        <Text text="Done" />
      </RoundButton>
    </RestaurantsComponent>
  );
};

export default Restaurants;
