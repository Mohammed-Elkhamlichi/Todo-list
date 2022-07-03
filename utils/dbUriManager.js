const dbUriManager = async () => {
    const NODE_ENV = process.env.NODE_ENV

    let dbUri;

    NODE_ENV === "development"
        ? dbUri = process.env.NEXT_PRIVATE_MONGODB_URI_DEVELOPMENT
        : dbUri = process.env.NEXT_PRIVATE_MONGODB_URI_PRODUCTION


    return dbUri

}

export default dbUriManager