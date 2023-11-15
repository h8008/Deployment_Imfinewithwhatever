// const cors = require('kcors');

// const corsOptions = {
//   credentials: true,
//   origin: '*',
//   exposeHeaders: ['Access-Token', 'Cookie'],
//   allowMethods: ['OPTIONS', 'POST', 'GET', 'PATCH', 'PUT'],
//   allowHeaders:
//     'Access-Control-Allow-Credentials, Access-Control-Allow-Origin, Access-Control-Allow-Methods, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
// };

const cors = async (ctx, next) => {
  console.log('in cors middleware');
  // Restrict origin to request origin to work with the withCredential attribute
  // Otherwise set to wildcard for deployment on vercel
  // const allowedOrigin = development() ? ctx.req.headers.origin : "*";

  // const origin = ctx.req.headers.origin == null ? '*' : ctx.req.headers.origin;
  // const origin = '*';
  const origin = ctx.req.headers.origin == null ? '*' : ctx.req.headers.origin;
  console.log('request origin: ', origin);
  ctx.res.setHeader('Access-Control-Allow-Origin', origin);
  ctx.res.setHeader('Access-Control-Allow-Credentials', true);
  ctx.res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,OPTIONS,PATCH,DELETE,POST,PUT'
  );
  ctx.res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Pragma, Cache-Control, Expires'
  );
  if (ctx.req.method === 'OPTIONS') {
    ctx.res.status = 200;
  }
  return await next();
};

module.exports = cors;
