const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Restaurants = new Schema({
  businesses: [{ type: Schema.Types.ObjectId, ref: 'RestaurantEntity' }],
  region: {
    center: {
      longitude: Number,
      latitude: Number,
    },
  },
  total: Number,
});

module.exports = mongoose.model('Restaurants', Restaurants);
