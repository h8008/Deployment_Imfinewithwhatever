const { UserReview } = require('../../database/models')

const GET_REVIEWS = ({ email }) => (UserReview.find().where('email').equals(email));

const GET_REVIEW = ({ restaurantID, email }) => (UserReview.findOne({
  restaurant_id: restaurantID,
  email: email
}))

module.exports = { GET_REVIEWS, GET_REVIEW };
