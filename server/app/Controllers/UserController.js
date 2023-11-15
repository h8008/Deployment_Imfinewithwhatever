const {
  FIND_USER,
  GET_RESTAURANT_PREFERENCE,
  GET_ALL_RESTAURANT_PREFERENCES,
  GET_REVIEW,
} = require('../Queries/userQueries');
const {
  SIGNUP,
  UPDATE_CURRENT_USER,
  ADD_RESTAURANT_PREFERENCE,
  UPDATE_RESTAURANT_PREFERENCE,
} = require('../Mutations/userMutations');
const setAccessToken = require('../../config/setAccessToken');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const {
  ALREADY_SIGNED_UP,
  ERROR_CREATING_USER,
  SUCCESSFULLY_CREATED_USER,
  LOGGED_IN,
} = require('../../constants/Messages');

const hash = async (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, function (err, hash) {
      if (err) {
        console.log('An error occurred while creating the user: ', err);
        return reject(ERROR_CREATING_USER);
      }
      return resolve(hash);
    });
  });
};

const getCurrentUser = async (ctx) => {
  const params = ctx.params;
  const res = await FIND_CURRENT_USER_DATA(params);
  ctx.body = res
    ? { userData: res, status: 'OK' }
    : { userData: undefined, status: 'NOT FOUND' };
};

const updateCurrentUser = async (ctx) => {
  const params = ctx.request.body;
  const res = await UPDATE_CURRENT_USER(params);
  ctx.body = res
    ? { status: 'OK', message: 'DATA ADDED', data: res }
    : { status: 'FAILED', message: 'DATA NOT ADDED', data: undefined };
};

const signup = async (ctx) => {
  try {
    console.log('user signup called');
    console.log(ctx.request.body);
    let params = ctx.request.body;
    let res = await FIND_USER(params);
    if (res) {
      ctx.body = {
        user: res,
        status: 'OK',
      };
      return;
    }
    const hashedPassword = await hash(params.password);
    params.password = hashedPassword;
    res = await SIGNUP(params);
    if (res) {
      ctx.body = {
        message: SUCCESSFULLY_CREATED_USER,
        status: 'OK',
        data: res.email,
      };
    }
  } catch (err) {
    console.log('Error when signing up: ', err);
    throw err;
  }
};

const login = async (ctx) => {
  try {
    console.log('user login called');
    console.log(ctx.request.body);
    let params = ctx.request.body;
    const res = await FIND_USER(params.email);
    if (res) {
      bcrypt.compare(params.password, res.password, function (err, result) {
        console.log('result', result);
        if (err) {
          console.log('Error while logging in');
          return;
        }
      });
      // console.log('from user record. About to return ', res);
      ctx.body = {
        status: 'OK',
        message: LOGGED_IN,
        data: res.email,
      };
    }
  } catch (err) {
    console.log('Error while logging in: ', err);
    throw err;
  }
};

const addRestaurantPreference = async (ctx) => {
  try {
    const params = ctx.request.body;
    const res = await ADD_RESTAURANT_PREFERENCE(params);
    if (res) {
      ctx.body = {
        message: `PREFERENCE SAVED`,
        status: 'OK',
      };
    }
  } catch (error) {
    console.log('Error when saving restaurant preference', error);
    throw error;
  }
};

const updateRestaurantPreference = async (ctx) => {
  try {
    let params = ctx.request.body;
    const res = await UPDATE_RESTAURANT_PREFERENCE(params);
    if (res) {
      ctx.body = {
        message: `Updated preference for the restaurant`,
        status: 'OK',
      };
    } else {
      ctx.body = {
        data: undefined,
        status: 'NOT FOUND',
      };
    }
  } catch (error) {
    console.log('Error when updating restaurant preference', error);
    throw error;
  }
};

const getRestaurantPreference = async (ctx) => {
  try {
    const params = ctx.params;
    const res = await GET_RESTAURANT_PREFERENCE(params);
    if (res) {
      ctx.body = {
        data: res.food_prefs,
        status: 'OK',
      };
    } else {
      ctx.body = {
        data: undefined,
        status: 'NOT FOUND',
      };
    }
  } catch (error) {
    console.log('Error when retrieving restaurant preference', error);
    throw error;
  }
};

const getAllRestaurantPreferencesForUser = async (ctx) => {
  const extractFoodPrefs = (userPreferences) => {
    return userPreferences.map((preference) => ({
      restaurantID: preference.restaurantID,
      food_prefs: preference.food_prefs,
    }));
  };

  try {
    const params = ctx.params;
    const res = await GET_ALL_RESTAURANT_PREFERENCES(params);
    if (res) {
      ctx.body = {
        data: res,
        status: 'OK',
      };
    } else {
      ctx.body = {
        data: undefined,
        status: 'NOT FOUND',
      };
    }
  } catch (error) {
    console.log(
      'Error when retrieving all restaurant preferences for current user',
      error
    );
  }
};

module.exports = {
  signup,
  login,
  updateCurrentUser,
  getCurrentUser,
  addRestaurantPreference,
  updateRestaurantPreference,
  getRestaurantPreference,
  getAllRestaurantPreferencesForUser,
};
