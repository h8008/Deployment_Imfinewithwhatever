const UserReviewController = require('../app/Controllers/UserReviewController');
const userReviewRouter = require('koa-router')({
  prefix: '/user_reviews',
});

userReviewRouter.post('/review', UserReviewController.addReview, (err) =>
  console.log('user-review-router post review route error: ', err)
);

userReviewRouter.get(
  '/review/:restaurantID/:email',
  UserReviewController.getReview,
  (err) => console.log('user-review-router get review route error: ', err)
);

userReviewRouter.get('/:email', UserReviewController.getReviews, (err) =>
  console.log('user-review-router get reviews route error', err)
);

userReviewRouter.get('/currentuser', UserReviewController.getReviews, (err) =>
  console.log('user-review-router get reviews route error', err)
);

userReviewRouter.post(
  '/review/update',
  UserReviewController.updateReview,
  (err) => console.log('user-review-router update review route error: ', err)
);

userReviewRouter.post('/delete', UserReviewController.deleteReview, (err) =>
  console.log('user-review-router delete review router error', err)
);

module.exports = userReviewRouter;
