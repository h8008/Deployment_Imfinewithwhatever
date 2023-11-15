const errorHandler = async (ctx, next) => {
  return next().catch((err) => {
    if (err.status === 401) {
      console.log('index.js: sending 401 to the client.');
      ctx.status = 401;
      ctx.body =
        'JWT Token expired. If this was an app in production, you do not want to tell the public why their request was rejected!';
    } else {
      console.log(
        'index.js: one of the modules in the chain fired an exception.'
      );
      console.log(`The error message is ${err}`);
    }
  });
};

module.exports = errorHandler;
