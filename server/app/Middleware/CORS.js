const cors = require('kcors');

const corsOptions = {
    credentials: true,
    // origin: `https://portfolio-two-taupe-78.vercel.app`,
    origin: "*",
    exposeHeaders: ["Access-Token", "Cookie"],
    allowMethods: ["OPTIONS", "POST", "GET", "PATCH", "PUT"],
    allowHeaders:
      "Access-Control-Allow-Credentials, Access-Control-Allow-Origin, Access-Control-Allow-Methods, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
  };


module.exports = function (app) {
    // Send standard CORS headers with all origins allowed                                                                                                
    app.use(cors(corsOptions));
};
