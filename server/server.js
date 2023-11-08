require('./loadEnvVariable.js')
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const connectDB = require('./database/mongodbConnect.js')
const cors = require('./app/Middleware/CORS.js')
const router = require('./routes/index.js')
const httpsServer = require('./config/ssl/ssl.js');
const catchJWTErrors = require('./app/Middleware/CatchJWTErrors.js');

const app = new Koa();
const port = process.env.APP_PORT

app.use(bodyParser());

cors(app)
router(app)
catchJWTErrors(app)
httpsServer(app.callback())

const startServer = () => {
    connectDB();
    app.listen(port, () => console.log(`Listening on HTTPS port ${port}`))
}

startServer()

module.exports = app

