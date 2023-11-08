const getDevEnvironment = () => {
  const dev = process.env.NODE_ENV === null ? '' : process.env.NODE_ENV;
  return dev.trim() === 'development';
};

export default getDevEnvironment;
