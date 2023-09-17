var mysql = require('mysql');
require('dotenv').config({ path: '../.env' });

var developmentDBOptions = {
  debug: true,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
}

const getProductionDBOptions = () => Object.fromEntries(Object.keys(developmentDBOptions).map((key, index) => (
  key === "database" || key === "debug" ? null : [key, Object.values(developmentDBOptions)[index]]
)).filter((option) => option !== null))

var options = process.env.PRODUCTION ? getProductionDBOptions() : developmentDBOptions
var connection = mysql.createConnection(options)

module.exports = connection;
