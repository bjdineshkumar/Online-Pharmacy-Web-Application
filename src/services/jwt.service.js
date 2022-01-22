const jwt = require("jsonwebtoken");
const constants = require("../config/constants.config");

const decodeToken = (token) => {
    try {
        const decoded = jwt.verify(token, constants.JWT_SECRET);
        return decoded;
    } catch (error) {
        console.error(error.message);
        return undefined;
    }
}

module.exports = {
    decodeToken
}