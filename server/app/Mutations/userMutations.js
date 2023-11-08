const { User, UserPreference, UserReview, RestaurantBlacklist } = require('../../database/models')

const SIGNUP = async ({ email, user_fName, user_lName, password }) => (
  await User.create({
    email,
    user_fName,
    user_lName,
    password
  })
)

const ADD_RESTAURANT_PREFERENCE = async ({ preference, like, email, restaurantID,}) => (
  await UserPreference.create({
    restaurant_id: restaurantID,
    email,
    food_prefs,
    like
  })
)

const UPDATE_RESTAURANT_PREFERENCE = async ({ preference, like, email, restaurantID }) => {
  await UserPreference.updateOne({
    food_prefs: preference
  }).where({
    email: email,
    restaurant_id: restaurantID
  })
}

module.exports = {
  SIGNUP,
  ADD_RESTAURANT_PREFERENCE,
  UPDATE_RESTAURANT_PREFERENCE,
};
