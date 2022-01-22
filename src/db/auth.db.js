const dbConfig = require("../config/db.config");

const addToken = async(token) => {
    try {
        let insertToken = await dbConfig.insertDb("token", token);
        if (insertToken == undefined) {
            return { "payload": insertToken, "message": "Error in adding token" };
        }
        return { "payload": insertToken, "message": "Token added successfully" };
    } catch (error) {
        console.error(error);
        return { "payload": undefined, "message": error.message };
    }
}

const getToken = async(tokenId) => {
    try {
        let token = await dbConfig.readDb("token", { tokenId: tokenId })
        if (token == undefined) {
            return { "payload": undefined, "message": "Token not found" };
        }
        return { "payload": token, "message": "Token found successfully" };
    } catch (error) {
        console.error(error);
        return { "payload": undefined, "message": error.message };
    }
}

const getTokenByUserId = async(userid) => {
    try {
        let tokens = await dbConfig.scanDb("token", 'userId = :userId', { ":userId": userid + "" })
        if (tokens.length == 0) {
            return { "payload": undefined, "message": "Token not found" };
        }
        return { "payload": tokens[0], "message": "Token found successfully" };
    } catch (error) {
        console.error(error);
        return { "payload": undefined, "message": error.message };
    }
}

const deleteToken = async(token) => {
    try {
        await dbConfig.deleteDb("token", { tokenId: token })
        return { "payload": { token }, "message": "Token deleted successfully" };
    } catch (error) {
        console.error(error);
        return { "payload": undefined, "message": error.message };
    }
}

module.exports = {
    addToken,
    getToken,
    getTokenByUserId,
    deleteToken
}