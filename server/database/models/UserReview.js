const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserReview = new Schema({
  restaurant_id: {
    type: String,
  },
  restaurant_name: {
    type: String,
  },
  email: {
    type: String,
  },
  review: {
    type: String,
  },
  rating: {
    type: Number,
  },
});

module.exports = mongoose.model('UserReview', UserReview);
