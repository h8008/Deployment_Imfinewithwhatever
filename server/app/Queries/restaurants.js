const Restaurants = require('../../database/models/Restaurants');

const GET_RESTAURANTS = async () => {
  const res = await Restaurants.find().populate({ path: 'businesses' });
  return res;
};

module.exports = { GET_RESTAURANTS };
