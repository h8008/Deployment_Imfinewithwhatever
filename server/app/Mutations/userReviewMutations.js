const { UserReview } = require("../../database/models");

const UPDATE_REVIEW = async ({ restaurantID, review }) => (
  UserReview.updateOne({
    review: review
  }).where({
    restaurant_id: restaurantID,
    email: email
  })
)

const ADD_REVIEW = async ({ restaurantID, restaurantName, email, review, rating }) => (
  UserReview.create({
    restaurant_id: restaurantID,
    restaurant_name: restaurantName,
    email,
    review,
    rating
  })
)

const DELETE_REVIEW = async ({ restaurantID, email }) => (
  UserReview.deleteOne({
    restaurant_id: restaurantID,
    email: email
  })
)

module.exports = {
  ADD_REVIEW,
  UPDATE_REVIEW,
  DELETE_REVIEW,
};
