// const ApiProblem = require('../Helpers/ApiProblem.js');

const setAccessToken = require('../../config/setAccessToken');

module.exports = (min_type) => {
  return async (ctx, next) => {
    console.log('min_type in authorize is', min_type);

    console.log('In Authorize. ctx.state = ', ctx.state);
    console.log('In Authorize. ctx.state.jwtdata = ', ctx.state.jwtdata);

    console.log('ctx.body', ctx.body);
    console.log('ctx.body.data', ctx.body.data);

    const user = ctx.body.data;
    setAccessToken(ctx, user);
    return await next();
  };
};
