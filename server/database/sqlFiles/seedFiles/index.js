const userQuery = require('./Users.js')
const userReviewQuery = require('./UserReviews.js')
const userPreferencesQuery = require('./UserPreferences.js')
const restaurantBlacklistQuery = require('./RestaurantBlacklist.js')

module.exports = [userQuery, userReviewQuery, userPreferencesQuery, restaurantBlacklistQuery]