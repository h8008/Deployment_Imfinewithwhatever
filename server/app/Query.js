const dbConnection = require("../database/mySQLconnect");
const dateFormat = require("dateformat");

const queryDB = (query, params) => {
  return new Promise((resolve, reject) => {
    dbConnection.query(
      {
        sql: query,
        values: params == null ? "" : [params],
      },
      (error, res) => {
        if (error) {
          console.log(`Connection error in : `, error);
          return resolve({ res: error, status: 404 });
        }
        return resolve({ res: res, status: 200 });
      }
    );
  });
};

const query = async ({ query, name, params }) => {
  return new Promise(async (resolve, reject) => {
    const queryRes = await queryDB(query, params);
    if (queryRes.status === 200) {
      return resolve(queryRes.res);
    }
    console.log(`Conneciton error in query: ${name}`);
    return reject(queryRes.res);
  }).catch((err) => {
    console.log(`Database connection error in ${name}`, err);
    return { res: [], status: 500 };
  });
};

// Helpful when trying to confirm if the thing you're trying to add to database already exists
const helperQuery = async ({ query, name, params }) => {
  return new Promise(async (resolve, reject) => {
    const queryRes = await queryDB(query, params);
    if (queryRes.status === 200) {
      return resolve(queryRes.res);
    }
    console.log(`Connection error in helper query: ${name}`);
    return resolve([]);
  }).catch((err) => {
    console.log(`Database connection error in ${name}`, err);
    return reject([]);
  });
};

function now() {
  return dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
}

module.exports = { query, helperQuery, queryDB, now };
