const productDb = require("../db/product.db");
const jwtService = require("../services/jwt.service");

const addProduct = async(product, token) => {
    let date = new Date();
    let productId = "P" + date.getTime();
    let ownerId = jwtService.decodeToken(token)["ownerId"];
    product["productId"] = productId;
    product["ownerId"] = ownerId;
    const { payload, message } = await productDb.addProduct(product);
    return { payload, message };
}

const updateProduct = async(product) => {
    const { payload, message } = await productDb.updateProduct(product);
    return { payload, message };
}

const getProduct = async(id) => {
    const { payload, message } = await productDb.getProduct(id);
    return { payload, message };
}

const getProducts = async() => {
    const { payload, message } = await productDb.getProducts();
    return { payload, message };
}

const getProductsByOwnerId = async(ownerid) => {
    const { payload, message } = await productDb.getProductsByOwnerId(ownerid);
    return { payload, message };
}

const deleteProduct = async(id) => {
    const { payload, message } = await productDb.deleteProduct(id);
    return { payload, message };
}

module.exports = {
    addProduct,
    updateProduct,
    getProduct,
    getProducts,
    getProductsByOwnerId,
    deleteProduct
}