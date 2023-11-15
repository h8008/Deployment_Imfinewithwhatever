const { User, UserPreference } = require('../../database/models');
const { FIND_USER } = require('../Queries/userQueries');
const convertToString = require('../../utils/ConvertToString.js');

const UPDATE_CURRENT_USER = async ({ email, data }) => {
  const user = await FIND_USER(email);
  const userData = await convertToString(data);
  console.log('stringified user data', userData);
  user.data = userData;
  await user.save();
  return user;
};

const SIGNUP = async ({ email, firstname, lastname, password }) =>
  await User.create({
    email,
    user_fName: firstname,
    user_lName: lastname,
    password,
  });

const ADD_RESTAURANT_PREFERENCE = async ({
  preference,
  like,
  email,
  restaurantID,
}) =>
  await UserPreference.create({
    restaurant_id: restaurantID,
    email: email,
    food_pref: preference,
    like: like,
  });

const UPDATE_RESTAURANT_PREFERENCE = async ({
  preference,
  like,
  email,
  restaurantID,
}) => {
  await UserPreference.updateOne({
    food_prefs: preference,
  }).where({
    email: email,
    restaurant_id: restaurantID,
  });
};

module.exports = {
  SIGNUP,
  UPDATE_CURRENT_USER,
  ADD_RESTAURANT_PREFERENCE,
  UPDATE_RESTAURANT_PREFERENCE,
};
