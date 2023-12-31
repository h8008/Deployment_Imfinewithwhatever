import { Fragment, useEffect, useReducer, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
//import TextField from '../../ui_components/TextField';
import GridRow from '../../ui_components/GridRow';
import GridItem from '../../ui_components/GridItem';
import Text from '../../ui_components/Text';
import Form from '../../ui_components/Form';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import { theme_config } from '../../styles/shared';
import styled from '@emotion/styled';

import { initialState, reducer } from '../../reducer/Reducer';
import {
  UPDATE_CUISINE,
  UPDATE_LOCATION,
  UPDATE_RESTAURANTS,
} from '../../reducer/Actions';

import { RestaurantsContext } from '../../providers/Restaurants';
import LocationAutocomplete from '../../ui_components/LocationAuto';
import { API } from '../../API_Interface';

const CuisineDropdown = (props) => {
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

const GoButtonComponent = styled(Button)(() => ({
  border: '2px solid black',
  borderRadius: '50%',
  height: '64px',
  width: '64px',
  marginTop: '100px',
}));

const Components = (props) => {
  const rowStyle = {
    width: '70%',
    display: theme_config.display('row', 'space-between'),
  };

  return (
    <Fragment>
      {props.components.map((comp, index) => (
        <GridRow columns={12} style={rowStyle} color='primary'>
          <GridItem xs={4}>
            <Text text={comp} color='error' />
          </GridItem>
          <GridItem xs={8}>
            {index === 1 ? (
              <CuisineDropdown
                cuisines={props.cuisines}
                cuisine={props.cuisine}
                handleCuisinesChange={props.handleCuisinesChange}
              />
            ) : (
              <LocationAutocomplete
                handleLocationChange={props.handleLocationChange}
              />
            )}
          </GridItem>
        </GridRow>
      ))}
    </Fragment>
  );
};

const MainComponent = styled(Grid)(() => {
  const base = {
    width: '80%',
    rowGap: 50,
  };
  const display = theme_config.display;
  return { ...base, ...display('column') };
});

function Main(props) {
  const components = ['Location', 'What kind of food?', 'Pick for me:'];
  const cuisines = [
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

  const { state, dispatch } = useContext(RestaurantsContext);

  const [location, setLocation] = useState('');
  const [cuisineIdx, setCuisineIdx] = useState(undefined);
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [restaurants, setRestaurants] = useState([]);

  const navigate = useNavigate();

  // console.log('global state', state);

  const handleLocationChange = (event) => {
    const location = event.target.value;
    setLocation(location);
  };

  const handleCuisinesChange = (selectedCuisineIdx) => {
    console.log('selected cuisines', cuisines[selectedCuisineIdx]);
    const newSelectedCuisines = [
      ...selectedCuisines,
      cuisines[selectedCuisineIdx],
    ];
    console.log('selected cuisines', newSelectedCuisines);
    setSelectedCuisines(newSelectedCuisines);
  };

  const handleSubmitData = async () => {
    if (location === '' || selectedCuisines.length === 0) {
      return;
    }
    dispatch({
      type: UPDATE_CUISINE,
      cuisines: selectedCuisines,
    });
    dispatch({
      type: UPDATE_LOCATION,
      location: location,
    });

    const params = { term: 'restaurant', location: location };
    const response = await API.YelpAPI.getRestaurant(params);
    if (response.status === 'OK') {
      dispatch({
        type: UPDATE_RESTAURANTS,
        payload: {
          restaurants: response.restaurantsData,
        },
      });
      navigate('/Restaurants');
    }
  };

  // useEffect(() => {
  //   if (restaurants.length > 0) {
  //     // Push location argument to global state
  //     // and navigate to the homepage
  //     // and render the restaurant page from there
  //     navigate('/')
  //   }
  // }, [restaurants.length])

  return (
    <MainComponent data_id='main-page'>
      {
        <Components
          components={components}
          cuisines={cuisines}
          cuisine={cuisines[cuisineIdx]}
          handleLocationChange={handleLocationChange}
          handleCuisinesChange={handleCuisinesChange}
        />
      }
      <GoButtonComponent onClick={handleSubmitData}>
        <Text text='GO' />
      </GoButtonComponent>
    </MainComponent>
  );
}

export default Main;
