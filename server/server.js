require('./loadEnvVariable.js')
const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const http = require('http');
// const connect = require('./database/mySQLconnectOnce.js')
const connection = require('./database/mySQLconnect')

// const envpath = __dirname + '/' + '.env';
// // Load environment variables (or .env if local environment)
// require('dotenv').config({ path: envpath });


console.log("env", process.env.DB_HOST)

const database = process.env.DB_HOST

app.use(bodyParser());
require('./app/Middleware/CORS.js')(app);

// Custom error catch for koa-jwt so that we can log the specific error message
// when attempting to read and parse the access_token
app.use(async (ctx, next) => {
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
});

require('./routes/index.js')(app);

const httpsServer = require('./config/ssl/ssl.js')(app.callback());

const startServer = () => {
  try {
    connection.connect((err) => {
      if (err) {
        console.log(err)
      } else {
        connection.destroy()
        httpsServer.listen(process.env.APP_PORT, () =>
          console.log(`Listening on HTTPS port ${process.env.APP_PORT}`)
        )
      }
    })
  } catch (err) {
    console.log(err)
    console.log("Connection to the database failed. Exiting without starting server")
  }
}

startServer()

