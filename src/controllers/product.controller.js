const constants = require("../config/constants.config");
const productService = require("../services/product.service");
const Response = require("../models/response.model");

const addProduct = async(req) => {
    const { payload, message } = await productService.addProduct(req.body, req.headers.token);
    if (payload === undefined) {
        return new Response(false, {}, constants.SC500, message);
    }
    return new Response(true, payload, constants.SC200, message);
}

const updateProduct = async(req) => {
    const { payload, message } = await productService.updateProduct(req.body);
    if (payload === undefined) {
        return new Response(false, {}, constants.SC500, message);
    }
    return new Response(true, payload, constants.SC200, message);
}

const getProduct = async(req) => {
    let id = req.query.id;
    if (id === undefined) {
        return new Response(false, {}, constants.SC400, "Please send product id");
    };
    const { payload, message } = await productService.getProduct(id);
    if (payload === undefined) {
        return new Response(false, {}, constants.SC500, message);
    }
    return new Response(true, payload, constants.SC200, message);
}

const getProducts = async() => {
    const { payload, message } = await productService.getProducts();
    if (payload === undefined) {
        return new Response(false, {}, constants.SC500, message);
    }
    return new Response(true, payload, constants.SC200, message);
}

const getProductsByOwnerId = async(req) => {
    let ownerid = req.query.ownerid;
    if (ownerid === undefined) {
        return new Response(false, {}, constants.SC400, "Please send owner id");
    };
    const { payload, message } = await productService.getProductsByOwnerId(ownerid);
    if (payload === undefined) {
        return new Response(false, {}, constants.SC500, message);
    }
    return new Response(true, payload, constants.SC200, message);
}

const deleteProduct = async(req) => {
    let id = req.query.id;
    if (id === undefined) {
        return new Response(false, {}, constants.SC400, "Please send product id");
    };
    const { payload, message } = await productService.deleteProduct(id);
    if (payload === undefined) {
        return new Response(false, {}, constants.SC500, message);
    }
    return new Response(true, payload, constants.SC200, message);
}

module.exports = {
    addProduct,
    updateProduct,
    getProduct,
    getProducts,
    getProductsByOwnerId,
    deleteProduct
}