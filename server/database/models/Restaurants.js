const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Restaurants = new Schema({
  businesses: [Schema.Types.ObjectId],
  region: {
    center: {
      longitude: Number,
      latitude: Number,
    },
  },
  total: Number,
});

module.exports = mongoose.model('Restaurants', Restaurants);
