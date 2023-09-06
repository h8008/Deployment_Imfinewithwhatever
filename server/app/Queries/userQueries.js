// const signupQuery = {
//   name: 'signup',
//   query: `INSERT INTO users VALUES (?)`,
// };

const FIND_USER = {
  name: "FIND_USER",
  query: `SELECT * FROM users WHERE email = ?`,
};

const GET_RESTAURANT_PREFERENCE = ({ restaurantID, email }) => ({
  name: "GET_RESTAURANT_PREFERENCE",
  query: `SELECT * FROM user_preferences WHERE restaurantID = "${restaurantID}" AND email = "${email}"`,
});

const GET_ALL_RESTAURANT_PREFERENCES = ({ email }) => ({
  name: "GET_ALL_RESTAURANT_PREFERENCES",
  query: `SELECT * FROM user_preferences WHERE email = "${email}"`,
});

const GET_REVIEW = ({ restaurantID, email }) => ({
  name: "GET_REVIEW",
  query: `SELECT * FROM user_reviews WHERE restaurantID = "${restaurantID}" and email="${email}"`,
});

module.exports = {
  // loginQuery,
  // signupQuery,
  FIND_USER,
  GET_RESTAURANT_PREFERENCE,
  GET_ALL_RESTAURANT_PREFERENCES,
};
