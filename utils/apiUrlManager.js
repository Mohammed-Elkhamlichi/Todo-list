const apiUrlManager = (endpoints) => {
    const NODE_ENV = process.env.NODE_ENV
    let apiUrl
    NODE_ENV === "development"
        ? apiUrl = `${process.env.NEXT_PUBLIC_API_URL_DEVELOPMENT}${endpoints}`
        : apiUrl = `${process.env.NEXT_PUBLIC_API_URL_PRODUCTION}${endpoints}`
    return apiUrl
}

export default apiUrlManager