const jwt = require('jsonwebtoken');
const constants = require("../config/constants.config");
const customerDb = require("../db/customer.db");
const ownerDb = require("../db/owner.db");
const authDb = require("../db/auth.db");

const login = async(usercred) => {
    let userPayload = undefined;
    if (usercred.type == constants.OWNER) {
        userPayload = await ownerDb.getOwnerByEmail(usercred.email);
    } else if (usercred.type == constants.CUSTOMER) {
        userPayload = await customerDb.getCustomerByEmail(usercred.email);
    } else {
        return { payload: undefined, message: "Unauthorized user type" };
    }

    let payload;
    let message;

    if (userPayload.payload == undefined) {
        payload = undefined;
        message = "User not found";
    } else if (userPayload.payload.password === usercred.password) {
        let userId = usercred.type == constants.OWNER ? userPayload.payload.ownerId : userPayload.payload.customerId;
        let tokenPayload = await authDb.getTokenByUserId(userId);
        let token;

        if (tokenPayload.payload != undefined) {
            token = tokenPayload.payload.tokenId;
        } else {
            token = await generateJWT(userPayload.payload);
        }

        payload = {
            "token": token,
            "type": usercred.type,
            "userid": userId
        };

        message = "User authenticated";
        await authDb.addToken({ "tokenId": token, "userId": userId });
    } else {
        payload = undefined;
        message = "Unauthorized user";
    }
    return { payload, message };
}

const logout = async(token) => {
    const { payload, message } = await authDb.deleteToken(token);
    return { payload, message };
}

const generateJWT = async(user) => {
    delete user.password;
    return jwt.sign(user, constants.JWT_SECRET);
}

const authorize = async(token) => {
    if (token == undefined) {
        return false;
    } else {
        try {
            let tokenPayload = await authDb.getToken(token);
            if (tokenPayload.payload != undefined) {
                jwt.verify(token, constants.JWT_SECRET);
                return true;
            }
            return false;
        } catch (error) {
            return false;
        }
    }
}

module.exports = {
    login,
    logout,
    authorize
}