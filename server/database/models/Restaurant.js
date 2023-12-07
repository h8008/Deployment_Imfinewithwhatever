const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RestaurantEntity = new Schema({
  yelp_id: String,
  name: String,
  alias: String,
  categories: [{ alias: String, title: String }],
  coordinates: {
    longitude: Number,
    latitude: Number,
  },
  display_phone: String,
  distance: Number,
  image_url: String,
  is_closed: Boolean,
  location: Object,
  phone: String,
  price: String,
  rating: Number,
  review_count: Number,
  transactions: [String],
});

module.exports = mongoose.model('RestaurantEntity', RestaurantEntity);
