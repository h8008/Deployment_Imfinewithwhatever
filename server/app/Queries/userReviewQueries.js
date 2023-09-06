const GET_REVIEWS = ({ email }) => ({
  name: "GET_REVIEWS",
  query: `SELECT * FROM user_reviews WHERE email = "${email}"`,
});

const GET_REVIEW = ({ restaurantID, email }) => ({
  name: "GET_REVIEW",
  query: `SELECT * FROM user_reviews WHERE restaurantID = "${restaurantID}" and email="${email}"`,
});

module.exports = { GET_REVIEWS, GET_REVIEW };
