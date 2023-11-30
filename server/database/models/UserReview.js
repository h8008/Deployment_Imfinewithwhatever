const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserReview = new Schema({
  restaurant_id: {
    type: String,
    required: true,
  },
  restaurant_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('UserReview', UserReview);
