const express = require('express');
const router = express.Router();
const orderController = require("../controllers/order.controller");

router.post('/add', async(req, res) => {
    const response = await orderController.addOrder(req);
    res.status(response.code).send(response);
});

router.put('/update/', async(req, res) => {
    const response = await orderController.updateOrder(req);
    res.status(response.code).send(response);
});

router.get('/get', async(req, res) => {
    const response = await orderController.getOrder(req);
    res.status(response.code).send(response);
});

router.get('/getbyowner', async(req, res) => {
    const response = await orderController.getOrdersByOwnerId(req);
    res.status(response.code).send(response);
});

router.get('/getbycustomer', async(req, res) => {
    const response = await orderController.getOrdersByCustomerId(req);
    res.status(response.code).send(response);
});

module.exports = router;