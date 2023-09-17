const query = `
    DROP TABLE IF EXISTS user_reviews;
    CREATE TABLE user_reviews
    (
        restaurantID varchar(100),
        restaurantName varchar(100),
        email varchar(100),
        review text(10000),
        rating int,
        PRIMARY KEY (restaurantID),
        FOREIGN KEY (email) REFERENCES users(email)
    );
`

module.exports = query