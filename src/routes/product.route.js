const express = require('express');
const router = express.Router();
const productController = require("../controllers/product.controller");

router.post('/add', async(req, res) => {
    const response = await productController.addProduct(req);
    res.status(response.code).send(response);
});

router.put('/update/', async(req, res) => {
    const response = await productController.updateProduct(req);
    res.status(response.code).send(response);
});

router.get('/get', async(req, res) => {
    const response = await productController.getProduct(req);
    res.status(response.code).send(response);
});

router.get('/getall', async(req, res) => {
    const response = await productController.getProducts();
    res.status(response.code).send(response);
});

router.get('/getbyowner', async(req, res) => {
    const response = await productController.getProductsByOwnerId(req);
    res.status(response.code).send(response);
});

router.delete('/delete', async(req, res) => {
    const response = await productController.deleteProduct(req);
    res.status(response.code).send(response);
});

module.exports = router;