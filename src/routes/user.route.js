const express = require('express');
const router = express.Router();
const customerController = require("../controllers/customer.controller");
const ownerController = require("../controllers/owner.controller");

router.post('/signup/customer', async(req, res) => {
    const response = await customerController.addCustomer(req);
    res.status(response.code).send(response);
});

router.put('/update/customer', async(req, res) => {
    const response = await customerController.updateCustomer(req);
    res.status(response.code).send(response);
});

router.get('/get/customer', async(req, res) => {
    const response = await customerController.getCustomer(req);
    res.status(response.code).send(response);
});

router.delete('/delete/customer', async(req, res) => {
    const response = await customerController.deleteCustomer(req);
    res.status(response.code).send(response);
});

router.get('/forgotpassword/customer', async(req, res) => {
    const response = await customerController.forgotPasswordCustomer(req);
    res.status(response.code).send(response);
});

router.post('/signup/owner', async(req, res) => {
    const response = await ownerController.addOwner(req);
    res.status(response.code).send(response);
});

router.put('/update/owner', async(req, res) => {
    const response = await ownerController.updateOwner(req);
    res.status(response.code).send(response);
});

router.get('/get/owner', async(req, res) => {
    const response = await ownerController.getOwner(req);
    res.status(response.code).send(response);
});

router.get('/forgotpassword/owner', async(req, res) => {
    const response = await ownerController.forgotPasswordOwner(req);
    res.status(response.code).send(response);
});

router.delete('/delete/owner', async(req, res) => {
    const response = await ownerController.deleteOwner(req);
    res.status(response.code).send(response);
});

module.exports = router;