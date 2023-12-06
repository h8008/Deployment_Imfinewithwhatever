const { ADD_RESTAURANTS } = require('../Mutations/restaurant.js');

const add = async (ctx) => {
  console.log('in restaurants add controller ');
  const params = ctx.request.body;
  const res = await ADD_RESTAURANTS(params);
  ctx.body = res
    ? { data: res, status: 'OK' }
    : { data: undefined, status: 'NOT FOUND' };
};

module.exports = {
  add,
};
