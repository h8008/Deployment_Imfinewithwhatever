// helpful query function template so that won't have to type a whole try catch block
// when making requests to the Yelp API

const headers = {
  Authorization: `Bearer ${process.env.API_KEY}`,
};
const endpoint = "https://api.yelp.com/v3/businesses/search";

const query = async ({ query, name, params }) => {
  // return new Promise(async (resolve, reject) => {
  //   const queryRes = await queryDB(query, params);
  //   if (queryRes.status === 200) {
  //     return resolve(queryRes.res);
  //   }
  //   console.log(`Conneciton error in query: ${name}`);
  //   return reject(queryRes.res);
  // }).catch((err) => {
  //   console.log(`Database connection error in ${name}`, err);
  //   return { res: [], status: 500 };
  // });
  return new Promise(async (resolve, reject) => {
    const queryRes = await axios
      .get(endpoint, { params, headers })
      .then((queryRes) => {
        console.log(queryRes.data);
        return resolve(queryRes.data);
      })
      .catch((err) => {
        console.log(`Yelp API connection error in ${name}`, err);
        return { res: {}, status: 500 };
      });
  });
};
