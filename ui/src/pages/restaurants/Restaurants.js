import Grid from '@mui/material/Grid';
import Restaurant from '../../components/Restaurant';

import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RestaurantsContext } from '../../providers/RestaurantsProvider';
import { MessageContext } from '../../providers/MessageProvider';

import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import CheckIcon from '@mui/icons-material/Check';
import Icon from '@mui/material/Icon';
import styled from '@emotion/styled';

import API from '../../API_Interface';

import { UserContext } from '../../providers/UserProvider';
import {
  UPDATE_MESSAGE,
  UPDATE_MODAL_OPEN,
} from '../../reducer/Message/MessageAction';

import {
  UPDATE_RESTAURANT,
  UPDATE_RESTAURANTS,
} from '../../reducer/MainActions';

const RestaurantsComponent = styled(Grid)({
  width: '1000px',
  height: '900px',
  margin: 'auto',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'wrap',
});

const RestaurantsContainer = styled(Grid)({
  width: '100%',
  height: '100%',
  data_id: 'restaurant-container',
});

// Filters the list of restaurants from Yelp API based on the blacklist stored
// in the User global state which was retrieved from the database at login
const filterRestaurantsByBlackList = (blacklist, restaurants) => {
  const blacklistObject = Object.fromEntries(
    blacklist
      .filter((item) => item.like === 'NO')
      .map((item) => [item.restaurantID, item.restaurantID])
  );
  return restaurants.filter(
    (restaurant) => blacklistObject[restaurant.id] == null
  );
};

const Restaurants = (props) => {
  const navigate = useNavigate();
  const { restaurantState, restaurantDispatch } =
    useContext(RestaurantsContext);
  const { userState, userDispatch } = useContext(UserContext);
  const { messageState, messageDispatch } = useContext(MessageContext);

  const restaurantsData = restaurantState.restaurantsData;
  const blacklistData = userState.preferences;

  // const [restaurants, setRestaurants] = useState(
  //   restaurantsData == null && blacklistData == null
  //     ? []
  //     : filterRestaurantsByBlackList([...blacklistData], [...restaurantsData])
  // );

  const [restaurants, setRestaurants] = useState(() => {
    if (blacklistData == null && restaurantsData == null) {
      return [];
    } else if (restaurantsData != null) {
      return [...restaurantsData];
    } else {
      return filterRestaurantsByBlackList(
        [...blacklistData],
        [...restaurantsData]
      );
    }
  });

  const [preference, setPreference] = useState(false);
  const [modelOpen, setModalOpen] = useState(preference);
  const [activeRestaurant, setActiveRestaurant] = useState(restaurants[0]);
  const [activeRestaurantIdx, setActiveRestaurantIdx] = useState(0);
  const [showActiveRestaurantLocation, setShowActiveRestaurantLocation] =
    useState(false);

  console.log('showActiveRestaurantLocation', showActiveRestaurantLocation);

  const onShowRestaurantLocationCallback = () => {
    setShowActiveRestaurantLocation(true);
  };

  const onDecisionCallback = async (preference) => {
    if (preference) {
      navigate('/Feedback');
      updateActiveRestaurant(activeRestaurantIdx, 'preference', [
        ...restaurantState.cuisines,
      ]);
      setPreference(true);
    } else {
      const newActiveRestaurantIdx =
        advanceActiveRestaurantIdx(activeRestaurantIdx);
      updateActiveRestaurant(newActiveRestaurantIdx, 'preference', [
        ...restaurantState.cuisines,
      ]);

      setPreference(false);
    }
  };

  const toggleModal = () => {
    setModalOpen(!modelOpen);
  };

  const updateActiveRestaurant = (
    newActiveRestaurantIdx,
    newProperty,
    newValue
  ) => {
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
    setActiveRestaurant(newActiveRestaurant);
    setRestaurants(newRestaurants);

    restaurantDispatch({
      type: UPDATE_RESTAURANT,
      restaurant: { ...newActiveRestaurant },
    });

    restaurantDispatch({
      type: UPDATE_RESTAURANTS,
      restaurantsData: [...newRestaurants],
    });
  };

  const handleViewPrevRestaurant = () => {
    const newActiveRestaurantIdx =
      activeRestaurantIdx - 1 <= -1
        ? restaurants.length - 1
        : activeRestaurantIdx - 1;
    updateActiveRestaurant(newActiveRestaurantIdx);
  };

  const handleViewNextRestaurant = () => {
    const newActiveRestaurantIdx =
      (activeRestaurantIdx + 1) % restaurants.length;
    updateActiveRestaurant(newActiveRestaurantIdx);
  };

  const advanceActiveRestaurantIdx = (activeRestaurantIdx) => {
    return (activeRestaurantIdx + 1) % restaurants.length;
  };

  const rollbackActiveRestaurantIdx = (activeRestaurantIdx) => {
    return activeRestaurantIdx - 1 <= -1
      ? restaurants.length - 1
      : activeRestaurantIdx - 1;
  };

  return (
    <RestaurantsContainer>
      <RestaurantsComponent>
        <Icon fontSize='large' color='error' onClick={handleViewPrevRestaurant}>
          <KeyboardDoubleArrowLeftIcon />
        </Icon>
        {activeRestaurant != null && (
          <Restaurant
            index={activeRestaurantIdx}
            restaurantData={{ ...restaurants[activeRestaurantIdx] }}
            onDecisionCallback={onDecisionCallback}
            onShowRestaurantLocationCallback={onShowRestaurantLocationCallback}
            showLocation={showActiveRestaurantLocation}
            email={userState.email}
            modalOpen={modelOpen}
            updateActiveRestaurant={updateActiveRestaurant}
            toggleModal={toggleModal}
          />
        )}
        <Icon fontSize='large' color='error' onClick={handleViewNextRestaurant}>
          <KeyboardDoubleArrowRightIcon />
        </Icon>
      </RestaurantsComponent>
    </RestaurantsContainer>
  );
};

export default Restaurants;
