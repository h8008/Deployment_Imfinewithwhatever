const { ADD_RESTAURANTS } = require('../Mutations/restaurant.js');
const { GET_RESTAURANTS } = require('../Queries/restaurants.js');

const add = async (ctx) => {
  console.log('in restaurants add controller ');
  const params = ctx.request.body;
  const res = await ADD_RESTAURANTS(params);
  ctx.body = res
    ? { data: res, status: 'OK' }
    : { data: undefined, status: 'NOT FOUND' };
};

const get = async (ctx) => {
  const res = await GET_RESTAURANTS();
  ctx.body = res
    ? { data: res, status: 'OK' }
    : { data: undefined, status: 'NOT FOUND' };
};

module.exports = {
  add,
  get,
};
