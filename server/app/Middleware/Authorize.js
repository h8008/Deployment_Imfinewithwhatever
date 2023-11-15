// const ApiProblem = require('../Helpers/ApiProblem.js');

const setAccessToken = require('../../config/setAccessToken');

module.exports = (min_type) => {
  return (ctx, next) => {
    console.log('min_type in authorize is', min_type);

    console.log('In Authorize. ctx.state = ', ctx.state);
    console.log('In Authorize. ctx.state.jwtdata = ', ctx.state.jwtdata);

    const user = ctx.body.data;
    setAccessToken(ctx, user);
    return next();
  };
};
