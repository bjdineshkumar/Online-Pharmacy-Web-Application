const constants = require("../config/constants.config");
const authService = require("../services/auth.service");
const Response = require("../models/response.model");

const login = async(req) => {
    console.log(req.body);
    const { payload, message } = await authService.login(req.body);
    if (payload === undefined) {
        return new Response(false, {}, constants.SC401, message);
    }
    return new Response(true, payload, constants.SC200, message);
}

const logout = async(req) => {
    let token = req.headers.token;
    if (token === undefined) {
        return new Response(false, {}, constants.SC401, "Unauthorized Request");
    };
    const { payload, message } = await authService.logout(token);
    if (payload === undefined) {
        return new Response(false, {}, constants.SC401, message);
    }
    return new Response(true, payload, constants.SC200, message);
}

module.exports = {
    login,
    logout
}