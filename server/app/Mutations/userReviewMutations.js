const ADD_REVIEW = {
  name: "ADD_REVIEW",
  mutation: `INSERT INTO User_Reviews VALUES (?)`,
};

const UPDATE_REVIEW = ({ restaurantID, email, review }) => ({
  name: "UPDATE_REVIEW",
  mutation: `UPDATE User_Reviews SET review = "${review}" WHERE restaurantID = "${restaurantID}" AND email = "${email}"`,
});

const DELETE_REVIEW = ({ restaurantID, email }) => ({
  name: "DELETE_REVIEW",
  mutation: `DELETE FROM User_Reviews WHERE restaurantID = "${restaurantID}" AND email = "${email}"`,
});

module.exports = {
  ADD_REVIEW,
  UPDATE_REVIEW,
  DELETE_REVIEW,
};
