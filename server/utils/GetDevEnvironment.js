const getDevEnvironment = () => {
    return process.env.NODE_ENV.trim() === "development"
}

module.exports = getDevEnvironment