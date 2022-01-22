const constants = require("../config/constants.config");
const customerService = require("../services/customer.service");
const Response = require("../models/response.model");

const addCustomer = async(req) => {
    const { payload, message } = await customerService.addCustomer(req.body);
    if (payload === undefined) {
        return new Response(false, {}, constants.SC500, message);
    }
    return new Response(true, payload, constants.SC200, message);
}

const updateCustomer = async(req) => {
    const { payload, message } = await customerService.updateCustomer(req.body);
    if (payload === undefined) {
        return new Response(false, {}, constants.SC500, message);
    }
    return new Response(true, payload, constants.SC200, message);
}

const getCustomer = async(req) => {
    let id = req.query.id;
    if (id === undefined) {
        return new Response(false, {}, constants.SC400, "Please send customer id");
    };
    const { payload, message } = await customerService.getCustomer(id);
    if (payload === undefined) {
        return new Response(false, {}, constants.SC500, message);
    }
    return new Response(true, payload, constants.SC200, message);
}

const deleteCustomer = async(req) => {
    let id = req.query.id;
    if (id === undefined) {
        return new Response(false, {}, constants.SC400, "Please send customer id");
    };
    const { payload, message } = await customerService.deleteCustomer(id);
    if (payload === undefined) {
        return new Response(false, {}, constants.SC500, message);
    }
    return new Response(true, payload, constants.SC200, message);
}

const forgotPasswordCustomer = async(req) => {
    let email = req.query.email;
    if (email === undefined) {
        return new Response(false, {}, constants.SC400, "Please send customer email");
    };
    const { payload, message } = await customerService.forgotPasswordCustomer(email);
    if (payload === undefined) {
        return new Response(false, {}, constants.SC500, message);
    }
    return new Response(true, payload, constants.SC200, message);
}

module.exports = {
    addCustomer,
    updateCustomer,
    getCustomer,
    deleteCustomer,
    forgotPasswordCustomer
}