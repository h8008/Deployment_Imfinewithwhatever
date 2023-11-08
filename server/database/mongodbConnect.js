const mongoose = require("mongoose")

const dev = () => {
  const dev = process.env.NODE_ENV == null ? "" : process.env.NODE_ENV;
  return dev.trim() === "development";
};

const MONGODB_URI = () => {
  const development = dev();
  development ? console.log("Connecting to local database") : console.log("Connecting to cloud database");

  return development ? process.env.MONGODB_LOCAL_URI : process.env.MONGODB_URI;
};

const getConnectOptions = () => {
  const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  };
  return dev() ? { ...options, family: 4 } : options;
};

const connect = async () => {
  try {
    await mongoose.connect(MONGODB_URI(), getConnectOptions());
    return;
  } catch (err) {
    console.error(err);
  }
};

module.exports = connect;