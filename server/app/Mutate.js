const dbConnection = require("../database/mySQLconnect");
const {
  ERROR_WHILE_CREATING_USER,
  SUCCESSFULLY_CREATED_USER,
} = require("../constants/Messages");

const mutateDB = (mutation, name, params) => {
  return new Promise((resolve, reject) => {
    dbConnection.query(
      {
        sql: mutation,
        values: params == null ? "" : [params],
      },
      (error, res) => {
        if (error) {
          console.log(`Connection error in ${name}: `, error);
          return resolve({ error: error, status: 404 });
        }
        return resolve({ res: res, status: 200 });
      }
    );
  });
};

const mutate = async ({ mutation, name, params }) => {
  console.log("mutation", mutation);

  return new Promise(async (resolve, reject) => {
    const mutateRes = await mutateDB(mutation, name, params);
    if (mutateRes.status === 200) {
      console.log("query result", mutateRes);
      return resolve(mutateRes.res);
    }
    console.log(`Conneciton error in query: ${name}`, mutateRes.error);
    return reject(null);
  }).catch((err) => {
    console.log(`Database connection error in ${name}`, err);
    return null;
  });
};

module.exports = { mutate, mutateDB };
