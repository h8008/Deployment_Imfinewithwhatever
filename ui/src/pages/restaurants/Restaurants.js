import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import styled from "@emotion/styled";

import Restaurant from "../../components/Restaurant";

import { RestaurantsContext } from "../../providers/RestaurantsProvider";
import { UserContext } from "../../providers/UserProvider";
import { NavigationContext } from "../../providers/NavigationProvider";

import { UPDATE_RESTAURANT, UPDATE_RESTAURANTS } from "../../reducer/Main/actions";
import { NAVIGATE } from "../../reducer/Navigator/actions";

import { RESTAURANTS_DATA_EMPTY_MESSAGE } from "../../constants/Messages";

import useDetectEmptyData from "../../hooks/useDetectEmptyData";
import API from "../../API_Interface";

const RestaurantsComponent = styled(Grid)({
  width: "1000px",
  height: "900px",
  margin: "auto",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  flexWrap: "wrap",
});

const RestaurantsContainer = styled(Grid)({
  width: "100%",
  height: "100%",
  data_id: "restaurant-container",
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

const useInitializeVerdicts = (restaurants, pos = null, v = "neutral") => {
  const initializeVerdicts = useMemo(() => {
    return restaurants != null && restaurants.length > 0
      ? new Array(restaurants.length).fill("neutral").map((verdict, index) => (index === pos ? v : verdict))
      : [];
  }, [pos, restaurants, v]);

  const verdicts = initializeVerdicts();
  return [verdicts];
};

const useRecordVerdictsOnPageRedirect = async (verdicts, restaurants, email) => {
  useEffect(() => {
    const add = async (verdict, restaurant, email) => {
      const res = await API.Preference.add({
        restaurant_id: restaurant.restaurant_id,
        email: email,
        like: verdict,
      });
      if (res.status !== "OK") {
      }
    };
    verdicts.forEach((v, idx) => {
      add(v, restaurants[idx], email);
    });
  }, [email, restaurants, verdicts]);
};

const Restaurants = (props) => {
  const { restaurantState, restaurantDispatch } = useContext(RestaurantsContext);
  const { navigationDispatch } = useContext(NavigationContext);
  const { userState, userDispatch } = useContext(UserContext);
  const [message, setMessage] = useState("");

  const restaurantsData = restaurantState.restaurantsData;
  const blacklistData = userState.preferences;

  const [preference, setPreference] = useState(null);
  const [modelOpen, setModalOpen] = useState(preference);
  const [activeRestaurantIdx, setActiveRestaurantIdx] = useState(0);
  const [restaurants] = useInitializeRestaurants(blacklistData, restaurantsData);
  const [activeRestaurant] = useInitializeActiveRestaurant(restaurantsData, activeRestaurantIdx);
  const [verdicts] = useInitializeVerdicts(restaurantsData, activeRestaurantIdx, preference);
  const [showActiveRestaurantLocation, setShowActiveRestaurantLocation] = useState(false);

  useDetectEmptyData(RESTAURANTS_DATA_EMPTY_MESSAGE, restaurantsData, restaurantsData == [], "/Main");

  const onShowRestaurantLocationCallback = () => {
    setShowActiveRestaurantLocation(true);
  };

  const onDecisionCallback = async (preference) => {
    if (preference) {
      updateActiveRestaurant(activeRestaurantIdx, "preference", [...restaurantState.cuisines]);
      navigationDispatch({
        type: NAVIGATE,
        payload: {
          destination: "/Feedback",
        },
      });
    } else {
      const newActiveRestaurantIdx = advanceActiveRestaurantIdx(activeRestaurantIdx);
      updateActiveRestaurant(newActiveRestaurantIdx, "preference", [...restaurantState.cuisines]);
    }
    setPreference(preference);
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
    <RestaurantsContainer>
      <RestaurantsComponent>
        <Icon fontSize="large" color="error" onClick={handleViewPrevRestaurant}>
          <KeyboardDoubleArrowLeftIcon />
        </Icon>
        {activeRestaurant != null && (
          <Restaurant
            index={activeRestaurantIdx}
            // restaurantData={{ ...restaurants[activeRestaurantIdx] }}
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
        <Icon fontSize="large" color="error" onClick={handleViewNextRestaurant}>
          <KeyboardDoubleArrowRightIcon />
        </Icon>
      </RestaurantsComponent>
    </RestaurantsContainer>
  );
};

export default Restaurants;
