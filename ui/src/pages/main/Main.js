import { Fragment, useState, useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
// import { useNavigate } from "react-router-dom";
import { useNavigate } from 'react-router';
import TextField from '../../ui_components/TextField';
import GridRow from '../../ui_components/GridRow';
import GridItem from '../../ui_components/GridItem';
import Text from '../../ui_components/Text';
import Form from '../../ui_components/Form';
import RoundButton from '../../ui_components/RoundButton';

import Grid from '@mui/material/Grid';
import MultiDecisionMaker from '../multiDecisionMaker/MultiDecisionMaker';

import { main_config } from '../../styles/shared';
import styled from '@emotion/styled';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import {
  UPDATE_CUISINE,
  UPDATE_LOCATION,
  UPDATE_RESTAURANTS,
} from '../../reducer/MainActions';

import { RestaurantsContext } from '../../providers/RestaurantsProvider';
import API from '../../API_Interface';
import { Box } from '@mui/material';
import { MessageContext } from '../../providers/MessageProvider';
import { UPDATE_MESSAGE } from '../../reducer/Message/MessageAction';

const getFoodPreferences = (categories) => {
  const lowercased_categories = categories.map((category) => {
    const charArray = category.split().map((char, index) => {
      if (index === 0) {
        return char.toLowerCase();
      }
      return char;
    });
    return charArray.join(',');
  });
  return lowercased_categories
    .reduce((string, category, categoryIdx) => `${string}${category},`, ``)
    .slice(0, -1);
};

const CuisineSliders = (props) => {
  return (
    <Form
      fullWidth='true'
      color='primary'
      focused='true'
      options={props.cuisines}
      onClick={props.handleCuisinesChange}
    />
  );
};

const MultipleIdeas = (props) => {
  const boxStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: '2px solid black',
    borderRadius: '5px',
    height: '66px',
  };

  const rowStyle = {
    width: '100%',
  };

  const handleArrowIconClick = () => {
    props.restaurantDispatch({});
    props.onMultipleIdeasCallback();
  };

  return (
    <GridRow style={rowStyle}>
      <Box sx={boxStyle}>
        <Text text={'Decide for me'} />
        <ArrowForwardIcon onClick={() => props.onMultipleIdeasCallback()} />
      </Box>
    </GridRow>
  );
};

const Components = (props) => {
  const rowStyle = {
    width: '60%',
    // display: main_config.display("row", "space-between"),
    display: 'flex',
    // justifyContent: 'space-between',
    alignItems: 'center',
  };

  const components = [
    <TextField
      fullWidth={true}
      color='primary'
      focused
      handleChange={props.handleLocationChange}
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
        <GridRow columns={12} columnGap={20} style={rowStyle} color='primary'>
          <GridItem style={{ width: '20%' }}>
            <Text text={comp} color='error' />
          </GridItem>
          <GridItem
            style={{
              width: '80%',
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            {components[index]}
          </GridItem>
        </GridRow>
        // <Grid gridRow={true} columns={12} columnGap={20} style={rowStyle} color="primary">
        //   <Grid item={true} style={{ width: '20%' }} >
        //     <Text text={comp} color="error" />
        //   </Grid>
        //   <Grid item={true} style={{ width: '80%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>{components[index]}</Grid>
        // </Grid>
      ))}
    </Fragment>
  );
};

// const MainComponent = styled(Grid)(() => {
//   const base = {
//     width: "90%",
//     rowGap: 50,
//   };
//   const display = main_config.display;
//   return { ...base, ...display("column") };
// });

const MainComponent = styled(Grid)({
  container: true,
  width: '100%',
  rowGap: 50,
  width: '90%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

function Main(props) {
  // const { onNavigateCallback } = props;

  const components = ['Location', 'What kind of food?', 'Multiple Ideas ?'];
  const cuisines = [
    'Mexican',
    'Japanese',
    'Filipino',
    'Burgers',
    'Italian',
    'Chinese',
    'BBQ',
    'Asian',
    'American',
    'Pizza',
  ];

  const games = ['Plinko', 'Wheel', 'Coin'];

  const { restaurantState, restaurantDispatch } =
    useContext(RestaurantsContext);

  const { messageDispatch } = useContext(MessageContext);

  const [location, setLocation] = useState('');
  const [cuisineIdx, setCuisineIdx] = useState(undefined);
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [shouldNavigate, setShouldNavigate] = useState(false);

  const navigate = useNavigate();

  const handleLocationChange = (event) => {
    const location = event.target.value;
    setLocation(location);
  };

  const handleCuisinesChange = (selectedCuisineIdx) => {
    console.log('selected cuisines', cuisines[selectedCuisineIdx]);
    const newSelectedCuisines = Object.keys(
      // Object.assign({}, [...selectedCuisines, cuisines[selectedCuisineIdx]])
      Object.fromEntries(
        [...selectedCuisines, cuisines[selectedCuisineIdx]].map(
          (cuisine, index) => [cuisine, cuisine]
        )
      )
    );
    console.log('selected cuisines', newSelectedCuisines);
    setSelectedCuisines(newSelectedCuisines);
  };

  const handleSubmitData = (mode) => {
    return new Promise(async (resolve, reject) => {
      if (location === '' && selectedCuisines.length === 0) {
        messageDispatch({
          type: UPDATE_MESSAGE,
          message: 'Please enter a location.',
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

      let params = { term: 'restaurant', location: location };
      let restaurant_by_location_response =
        await API.YelpAPI.getRestaurantsByLocation(params);
      let restaurantsByLocationData = {};
      if (restaurant_by_location_response.status === 'OK') {
        restaurantsByLocationData = await {
          ...restaurantsByLocationData,
          ...restaurant_by_location_response.restaurantsData,
        };
      }

      params = {
        term: 'food',
        location: location,
        categories: await getFoodPreferences(selectedCuisines),
      };
      let restaurant_by_cuisine_response =
        await API.YelpAPI.getRestaurantsByCuisine(params);
      if (restaurant_by_cuisine_response.status === 'OK') {
        const aggregatedRestaurantData = await {
          ...restaurantsByLocationData,
          ...restaurant_by_cuisine_response.restaurantsData,
        };

        setRestaurants(aggregatedRestaurantData.businesses);

        await restaurantDispatch({
          type: UPDATE_RESTAURANTS,
          restaurantsData: aggregatedRestaurantData.businesses,
          region: aggregatedRestaurantData.region,
        });

        return resolve('data sent to database and global state');
      }
    });
  };

  const handleDecideForMeButtonClick = async () => {
    await handleSubmitData('normal');
    navigate('/MultiDecisionMaker', { replace: true });
  };

  const handleGoButtonClick = async () => {
    await handleSubmitData('game');
    navigate('/Restaurants');
  };

  return (
    <MainComponent data_id='main-page'>
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
        <Text text='GO' />
      </RoundButton>
      {/* {shouldNavigate && <Navigate to={"/MultiDecisionMaker"} />} */}
    </MainComponent>
  );
}

export default Main;
