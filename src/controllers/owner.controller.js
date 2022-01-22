const constants = require("../config/constants.config");
const ownerService = require("../services/owner.service");
const Response = require("../models/response.model");

const addOwner = async(req) => {
    const { payload, message } = await ownerService.addOwner(req.body);
    if (payload === undefined) {
        return new Response(false, {}, constants.SC500, message);
    }
    return new Response(true, payload, constants.SC200, message);
}

const updateOwner = async(req) => {
    const { payload, message } = await ownerService.updateOwner(req.body);
    if (payload === undefined) {
        return new Response(false, {}, constants.SC500, message);
    }
    return new Response(true, payload, constants.SC200, message);
}

const getOwner = async(req) => {
    let id = req.query.id;
    if (id === undefined) {
        return new Response(false, {}, constants.SC400, "Please send owner id");
    };
    const { payload, message } = await ownerService.getOwner(id);
    if (payload === undefined) {
        return new Response(false, {}, constants.SC500, message);
    }
    return new Response(true, payload, constants.SC200, message);
}

const deleteOwner = async(req) => {
    let id = req.query.id;
    if (id === undefined) {
        return new Response(false, {}, constants.SC400, "Please send owner id");
    };
    const { payload, message } = await ownerService.deleteOwner(id);
    if (payload === undefined) {
        return new Response(false, {}, constants.SC500, message);
    }
    return new Response(true, payload, constants.SC200, message);
}

const forgotPasswordOwner = async(req) => {
    let email = req.query.email;
    if (email === undefined) {
        return new Response(false, {}, constants.SC400, "Please send owner email");
    };
    const { payload, message } = await ownerService.forgotPasswordOwner(email);
    if (payload === undefined) {
        return new Response(false, {}, constants.SC500, message);
    }
    return new Response(true, payload, constants.SC200, message);
}

module.exports = {
    addOwner,
    getOwner,
    updateOwner,
    deleteOwner,
    forgotPasswordOwner
}