const query = `
    DROP TABLE IF EXISTS user_preferences;

    CREATE TABLE user_preferences
    (
      restaurantID varchar(100),
      email varchar(100),
      food_prefs varchar(200),
      likes varchar(50),
      PRIMARY KEY (restaurantID),
      FOREIGN KEY (email) REFERENCES users(email)
    );
  `

module.exports = query