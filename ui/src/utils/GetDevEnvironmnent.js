const getDevEnvironment = () => {
  const dev =
    process.env.REACT_APP_PRODUCTION === null
      ? ''
      : process.env.REACT_APP_PRODUCTION;
  return dev.trim() === 'true';
};

export default getDevEnvironment;
