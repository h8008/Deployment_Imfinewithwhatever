const restaurantRouter = require('koa-router')({
  prefix: '/restaurants',
});
const RestaurantController = require('../app/Controllers/RestaurantController');

restaurantRouter.get('/', (ctx) => {
  const message = 'default restaurants route';
  console.log(message);
  return (ctx.body = message);
});

restaurantRouter.post('/add', RestaurantController.add);

module.exports = restaurantRouter;
