const SIGNUP = {
  name: "signup",
  mutation: `INSERT INTO users VALUES (?)`,
};

const ADD_RESTAURANT_PREFERENCE = {
  name: "add_restaurant_preference",
  mutation: `INSERT INTO user_preferences VALUES (?)`,
};

const UPDATE_RESTAURANT_PREFERENCE = ({
  preference,
  like,
  email,
  restaurantID,
}) => ({
  name: "update_restaurant_preference",
  mutation: `UPDATE 
            user_preferences 
            SET 
            food_prefs = "${preference}"
            
            WHERE 
            email = "${email}"
            AND 
            restaurantID = "${restaurantID}"
            `,
});

module.exports = {
  SIGNUP,
  ADD_RESTAURANT_PREFERENCE,
  UPDATE_RESTAURANT_PREFERENCE,
};
