const Preference = require('../../database/models/Preference.js');

const ADD_PREFERENCE = async ({ categories, like, email, restaurantID }) =>
  await Preference.create({
    restaurant_id: restaurantID,
    email: email,
    categories: categories,
    like: like,
  });

const UPDATE_PREFERENCE = async ({ categories, like, email, restaurantID }) => {
  await Preference.updateOne({
    like: like,
  }).where({
    email: email,
    restaurant_id: restaurantID,
    categories: categories,
  });
};

const DELETE_PREFERENCE = async ({ email, restaurantID }) => {
  await Preference.deleteOne({
    restaurant_id: restaurantID,
    email: email,
  });
};

module.exports = { ADD_PREFERENCE, UPDATE_PREFERENCE, DELETE_PREFERENCE };
