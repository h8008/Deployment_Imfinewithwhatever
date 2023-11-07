require('./loadEnvVariable.js')
const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
// const connect = require('./database/mySQLconnectOnce.js')
// const connection = require('./database/mySQLconnect')
const connectDB = require('./database/mongodbConnect.js')
const cors = require('./app/Middleware/CORS.js')
const router = require('./routes/index.js')
const httpsServer = require('./config/ssl/ssl.js');
const catchJWTErrors = require('./app/Middleware/CatchJWTErrors.js');

// const envpath = __dirname + '/' + '.env';
// // Load environment variables (or .env if local environment)
// require('dotenv').config({ path: envpath });

// console.log("env", process.env.DB_HOST)
// const database = process.env.DB_HOST

app.use(bodyParser());

cors(app)
router(app)
catchJWTErrors(app)
httpsServer(app.callback())

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

