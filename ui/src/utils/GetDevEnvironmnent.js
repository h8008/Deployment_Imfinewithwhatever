const getDevEnvironment = () => {
  const dev = process.env.REACT_APP_DEVELOPMENT == null ? "" : process.env.REACT_APP_DEVELOPMENT;
  return dev.trim() === "true";
};

export default getDevEnvironment;
