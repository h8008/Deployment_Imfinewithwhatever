import { useContext, useEffect, useMemo, useState } from "react";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import styled from "@emotion/styled";
import RoundButton from "../../ui_components/RoundButton";

import Restaurant from "../../components/Restaurant";

import { RestaurantsContext } from "../../providers/RestaurantsProvider";
import { UserContext } from "../../providers/UserProvider";

import { UPDATE_RESTAURANT, UPDATE_RESTAURANTS } from "../../reducer/Main/actions";

import useDispatchMessage from "../../hooks/useDispatchMessage";

import API from "../../API_Interface";
import { AssetsContext } from "../../providers/AssetsProvider";

import { useTheme } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

import { fetchRestaurantsFromYelp } from "../../utils/axios/restaurants";
import { useFetchYelpRestaurants, useSelectRestaurantsByLocation } from "../../hooks/API/Restaurants";

const RestaurantsComponent = styled(Grid)(({ theme }) => ({
  container: true,
  width: "100vw",
  height: "100vh",
  margin: "auto",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  flexWrap: "wrap",
  rowGap: 10,
  backgroundColor: theme.palette.background.default,
}));

const ButtonsComponent = styled(Grid)({
  container: true,
  width: "10%",
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  flexDirection: "row",
});

// Filters the list of restaurants from Yelp API based on the blacklist stored
// in the User global state which was retrieved from the database at login
const filterRestaurantsByBlackList = (blacklist, restaurants) => {
  const blacklistObject = Object.fromEntries(
    blacklist.filter((item) => item.like === "NO").map((item) => [item.restaurantID, item.restaurantID])
  );
  return restaurants.filter((restaurant) => blacklistObject[restaurant.id] == null);
};

// const useInitializeRestaurants = (intialBlacklist, initialRestaurants) => {
//   const initializeRestaurants = () => {
//     if (initialRestaurants == null) return [];
//     if (intialBlacklist.length > 0 && initialRestaurants.length > 0) {
//       return filterRestaurantsByBlackList([...intialBlacklist], [...initialRestaurants]);
//     }
//     if (initialRestaurants.length > 0) {
//       return [...initialRestaurants];
//     }
//     return [];
//   };

//   const [restaurants, setRestaurants] = useState(initializeRestaurants);
//   return [restaurants, setRestaurants];
// };

const useInitializeRestaurants = (sources) => {
  const restaurants = useMemo(() => sources.filter((src, i) => src.length > 0), [sources]);

  return restaurants;
};

const useInitializeActiveRestaurant = (restaurants, activeRestaurantIdx) => {
  const restaurant = useMemo(
    () => (restaurants == null || restaurants.length === 0 ? undefined : restaurants[activeRestaurantIdx]),
    [restaurants, activeRestaurantIdx]
  );
  return [restaurant];
};

const useUpdateRestaurants = (newRestaurants, recordedRestaurants) => {
  return useMemo(
    () => (newRestaurants.length > 0 ? newRestaurants : recordedRestaurants),
    [newRestaurants, recordedRestaurants]
  );
};

const initializeVerdicts = (restaurants, pos, v) => {
  return restaurants != null && restaurants.length > 0
    ? new Array(restaurants.length).fill("neutral").map((verdict, index) => (index === pos ? v : verdict))
    : [];
};

const initializeMessage = () => "";

const useRecordVerdictsOnPageChange = (verdicts, restaurants, email, location, ready) => {
  const getCategories = (categories) => categories.map((cat) => cat.title);
  useEffect(() => {
    if (ready) {
      const add = async (verdict, restaurant, email) => {
        const res = await API.Preference.add({
          restaurant_id: restaurant.id,
          categories: getCategories(restaurant.categories),
          location,
          email,
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
  }, [email, restaurants, verdicts, ready, location]);
};

const updateVerdicts = (verdicts, activeRestaurantIdx, verdict) => {
  const v = [...verdicts];
  v[activeRestaurantIdx] = verdict;
  return v;
};

const useTransition = (cond, next) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (cond) {
      const dest = "/" + next;
      navigate(dest);
    }
  }, [cond, navigate, next]);
};

const Restaurants = (props) => {
  const theme = useTheme();
  const locationState = useLocation();
  const navigate = useNavigate();

  const { assets } = useContext(AssetsContext);
  const { restaurantState, restaurantDispatch } = useContext(RestaurantsContext);
  const { userState } = useContext(UserContext);

  // const restaurantsData = locationState.state.restaurants;

  // const blacklistData = userState.preferences || [];
  const location = restaurantState.location;
  const region = restaurantState.region;
  const restaurantsFromServer = useFetchYelpRestaurants(restaurantState.restaurantData, region);

  const [restaurants] = useInitializeRestaurants([
    locationState.state != null ? locationState.state.restaurants : [],
    restaurantState.restaurantsData != null ? restaurantState.restaurantsData : [],
    restaurantsFromServer != null ? restaurantsFromServer : [],
  ]);

  const [message, setMessage] = useState(initializeMessage());
  const [preference, setPreference] = useState(null);
  const [modelOpen, setModalOpen] = useState(preference);
  const [activeRestaurantIdx, setActiveRestaurantIdx] = useState(0);

  // const [activeRestaurant] = useInitializeActiveRestaurant(restaurants.businesses, activeRestaurantIdx);
  const [activeRestaurant] = useInitializeActiveRestaurant(restaurants, activeRestaurantIdx);
  const [verdicts, setVerdicts] = useState(initializeVerdicts(restaurants, activeRestaurantIdx, preference));
  const [showActiveRestaurantLocation, setShowActiveRestaurantLocation] = useState(false);
  const [dispatchVerdicts, setDispatchVerdicts] = useState(false);

  useRecordVerdictsOnPageChange(verdicts, restaurants, userState.email, location, dispatchVerdicts);
  useDispatchMessage(message);
  useTransition(dispatchVerdicts, "Feedback");

  const onShowRestaurantLocationCallback = () => {
    setShowActiveRestaurantLocation(true);
  };

  const handleDoneSettingPreference = () => {
    setDispatchVerdicts(true);
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
        restaurants: [...newRestaurants],
      },
    });
  };

  const handleViewPrevRestaurant = () => {
    const newActiveRestaurantIdx = activeRestaurantIdx - 1 <= -1 ? restaurants.length - 1 : activeRestaurantIdx - 1;
    // updateActiveRestaurant(newActiveRestaurantIdx);
    setActiveRestaurantIdx(newActiveRestaurantIdx);
  };

  const handleViewNextRestaurant = () => {
    const newActiveRestaurantIdx = (activeRestaurantIdx + 1) % restaurants.length;
    // updateActiveRestaurant(newActiveRestaurantIdx);
    setActiveRestaurantIdx(newActiveRestaurantIdx);
  };

  const advanceActiveRestaurantIdx = (activeRestaurantIdx) => {
    return (activeRestaurantIdx + 1) % restaurants.length;
  };

  const rollbackActiveRestaurantIdx = (activeRestaurantIdx) => {
    return activeRestaurantIdx - 1 <= -1 ? restaurants.length - 1 : activeRestaurantIdx - 1;
  };

  return (
    <RestaurantsComponent backdrop={assets[5]}>
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
          onViewPrevCallback={handleViewPrevRestaurant}
          onViewNextCallback={handleViewNextRestaurant}
          onDoneSettingPreferenceCallback={handleDoneSettingPreference}
        />
      )}
    </RestaurantsComponent>
  );
};

export default Restaurants;
