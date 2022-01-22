const constants = require("../config/constants.config");
const orderService = require("../services/order.service");
const Response = require("../models/response.model");

const addOrder = async(req) => {
    const { payload, message } = await orderService.addOrder(req.body, req.headers.token);
    if (payload === undefined) {
        return new Response(false, {}, constants.SC500, message);
    }
    return new Response(true, payload, constants.SC200, message);
}

const updateOrder = async(req) => {
    const { payload, message } = await orderService.updateOrder(req.body);
    if (payload === undefined) {
        return new Response(false, {}, constants.SC500, message);
    }
    return new Response(true, payload, constants.SC200, message);
}

const getOrder = async(req) => {
    let id = req.query.id;
    if (id === undefined) {
        return new Response(false, {}, constants.SC400, "Please send order id");
    };
    const { payload, message } = await orderService.getOrder(id);
    if (payload === undefined) {
        return new Response(false, {}, constants.SC500, message);
    }
    return new Response(true, payload, constants.SC200, message);
}

const getOrdersByOwnerId = async(req) => {
    let ownerid = req.query.ownerid;
    if (ownerid === undefined) {
        return new Response(false, {}, constants.SC400, "Please send owner id");
    };
    const { payload, message } = await orderService.getOrdersByOwnerId(ownerid);
    if (payload === undefined) {
        return new Response(false, {}, constants.SC500, message);
    }
    return new Response(true, payload, constants.SC200, message);
}

const getOrdersByCustomerId = async(req) => {
    let customerid = req.query.customerid;
    if (customerid === undefined) {
        return new Response(false, {}, constants.SC400, "Please send customer id");
    };
    const { payload, message } = await orderService.getOrdersByCustomerId(customerid);
    if (payload === undefined) {
        return new Response(false, {}, constants.SC500, message);
    }
    return new Response(true, payload, constants.SC200, message);
}

module.exports = {
    addOrder,
    updateOrder,
    getOrder,
    getOrdersByOwnerId,
    getOrdersByCustomerId
}