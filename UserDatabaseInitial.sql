-- Creating our database that will hold our list of users that use our react application, a table for the users' food preferences, and a table for user reviews
DROP DATABASE IF EXISTS userdata;
create database userdata;

USE userdata;

DROP TABLE IF EXISTS `users`;
DROP TABLE IF EXISTS `user_preferences`;
DROP TABLE IF EXISTS `user_reviews`;
DROP TABLE IF EXISTS `restaurant_blacklist`;

CREATE TABLE `users`
(
  `email` varchar(100) NOT NULL,
  `user_fName` varchar(40) NOT NULL,
  `user_lName` varchar(40) NOT NULL,
  `password` varchar(128) NOT NULL,
  PRIMARY KEY (`email`)
);

CREATE TABLE `user_preferences`
(
  `restaurantID` varchar(100),
  `email` varchar(100),
  `food_prefs` varchar(200),
  `like` varchar(50),
  PRIMARY KEY (`restaurantID`),
  FOREIGN KEY (`email`) REFERENCES users(email)
);

CREATE TABLE `user_reviews`
(
    `restaurantID` varchar(100),
    `restaurantName` varchar(100),
    -- `userID` varchar(100),
    `email` varchar(100),
    `review` text(10000),
    `rating` int,
    PRIMARY KEY (`restaurantID`),
    FOREIGN KEY (`email`) REFERENCES users(email)
);

CREATE TABLE `restaurant_blacklist`
(
    `restaurantID` varchar(100),
    `restaurantName` varchar(100),
    `email` varchar(100),
    PRIMARY KEY (`restaurantID`),
    FOREIGN KEY (`email`) REFERENCES users(email)
);
