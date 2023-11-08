const { User, UserPreference, UserReview, RestaurantBlacklist } = require('../../database/models')

// const FIND_USER = {
//   name: "FIND_USER",
//   query: `SELECT * FROM users WHERE email = ?`,
// };

// const GET_RESTAURANT_PREFERENCE = ({ restaurantID, email }) => ({
//   name: "GET_RESTAURANT_PREFERENCE",
//   query: `SELECT * FROM user_preferences WHERE restaurantID = "${restaurantID}" AND email = "${email}"`,
// });

// const GET_ALL_RESTAURANT_PREFERENCES = ({ email }) => ({
//   name: "GET_ALL_RESTAURANT_PREFERENCES",
//   query: `SELECT * FROM user_preferences WHERE email = "${email}"`,
// });

// const GET_REVIEW = ({ restaurantID, email }) => ({
//   name: "GET_REVIEW",
//   query: `SELECT * FROM user_reviews WHERE restaurantID = "${restaurantID}" and email="${email}"`,
// });

const FIND_USER = ({ email }) => (User.findOne().where("email").equals(email))

const GET_RESTAURANT_PREFERENCE = ({ restaurantID, email }) => (UserPreference.findOne({
    email: email,
    restaurantID: restaurantID
  }))

const GET_ALL_RESTAURANT_PREFERENCES = ({ email }) => (UserPreference.find().where('email').equals(email))

module.exports = {
  FIND_USER,
  GET_RESTAURANT_PREFERENCE,
  GET_ALL_RESTAURANT_PREFERENCES,
};
