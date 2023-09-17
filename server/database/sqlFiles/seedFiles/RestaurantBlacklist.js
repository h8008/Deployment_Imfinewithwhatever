const query = `
    DROP TABLE IF EXISTS restaurant_blacklist;
    CREATE TABLE restaurant_blacklist
    (
        restaurantID varchar(100),
        restaurantName varchar(100),
        email varchar(100),
        PRIMARY KEY (restaurantID),
        FOREIGN KEY (email) REFERENCES users(email)
    );
`

module.exports = query