const createJson = (Boolean, message, queryResult, token) => {
    return {
        isSuccess: Boolean,
        message,
        result: {
            queryResult,
            token,
        } 
    }
}

module.exports = {
    createJson
}