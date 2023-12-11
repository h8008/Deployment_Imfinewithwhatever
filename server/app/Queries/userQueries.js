const {
  User,
  Preference,
  UserReview,
  RestaurantBlacklist,
} = require('../../database/models');

const FIND_USER = ({ email }) => User.findOne().where('email').equals(email);

const GET_CURRENT_USER_YELP_DATA = async ({ email }) => {
  const user = await User.findOne().where('email').equals(email);
  return user == null ? undefined : user.data;
};

const CURRENT_USER_DATA = async ({ email }) => {
  const user = await FIND_USER(email);
  return await JSON.parse(user.data);
};

const GET_RESTAURANT_PREFERENCE = ({ restaurantID, email }) =>
  Preference.findOne({
    email: email,
    restaurantID: restaurantID,
  });

const GET_ALL_RESTAURANT_PREFERENCES = ({ email }) =>
  Preference.find().where('email').equals(email);

module.exports = {
  FIND_USER,
  CURRENT_USER_DATA,
  GET_CURRENT_USER_YELP_DATA,
  GET_RESTAURANT_PREFERENCE,
  GET_ALL_RESTAURANT_PREFERENCES,
};
