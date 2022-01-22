const dbConfig = require("../config/db.config");

const addProduct = async(product) => {
    try {
        let insertProduct = await dbConfig.insertDb("product", product);
        if (insertProduct == undefined) {
            return { "payload": insertProduct, "message": "Error in adding product" };
        }
        return { "payload": insertProduct, "message": "Product added successfully" };
    } catch (error) {
        console.error(error);
        return { "payload": undefined, "message": error.message };
    }
}

const updateProduct = async(product) => {
    try {
        await dbConfig.updateDb("product", product);
        let updateProduct = await dbConfig.readDb("product", { productId: product.productId });
        return { "payload": updateProduct, "message": "Product updated successfully" };
    } catch (error) {
        console.error(error);
        return { "payload": undefined, "message": error.message };
    }
}

const getProduct = async(id) => {
    try {
        let product = await dbConfig.readDb("product", { productId: id + "" })
        if (product == undefined) {
            return { "payload": undefined, "message": "Product not found" };
        }
        return { "payload": product, "message": "Product found successfully" };
    } catch (error) {
        console.error(error);
        return { "payload": undefined, "message": error.message };
    }
}

const getProducts = async() => {
    try {
        let products = await dbConfig.scanDb("product", '', {})
        if (products == undefined) {
            return { "payload": products, "message": "Products not found" };
        }
        return { "payload": products, "message": "Products found successfully" };
    } catch (error) {
        console.error(error);
        return { "payload": undefined, "message": error.message };
    }
}

const getProductsByOwnerId = async(ownerid) => {
    try {
        let products = await dbConfig.scanDb("product", 'ownerId = :ownerId', { ":ownerId": ownerid + "" })
        if (products == undefined) {
            return { "payload": products, "message": "Products not found" };
        }
        return { "payload": products, "message": "Products found successfully" };
    } catch (error) {
        console.error(error);
        return { "payload": undefined, "message": error.message };
    }
}

const deleteProduct = async(id) => {
    try {
        await dbConfig.deleteDb("product", { productId: id + "" })
        return { "payload": { productId: id + "" }, "message": "Product deleted successfully" };
    } catch (error) {
        console.error(error);
        return { "payload": undefined, "message": error.message };
    }
}

module.exports = {
    addProduct,
    updateProduct,
    getProduct,
    getProducts,
    getProductsByOwnerId,
    deleteProduct
}