const corsOptions = {
  credentials: true,
  origin: '*',
  exposeHeaders: ['Access-Token', 'Cookie'],
  allowMethods: ['OPTIONS', 'POST', 'GET', 'PATCH', 'PUT'],
  allowHeaders:
    'Access-Control-Allow-Credentials, Access-Control-Allow-Origin, Access-Control-Allow-Methods, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
};

module.exports = corsOptions;
