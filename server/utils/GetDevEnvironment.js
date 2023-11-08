const getDevEnvironment = () => {
    return process.env.NODE_ENV.trim() === "development"
}

export default getDevEnvironment