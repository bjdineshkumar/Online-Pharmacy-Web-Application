const express = require('express');
const router = express.Router();
const authController = require("../controllers/auth.controller");

router.post('/login', async(req, res) => {
    const response = await authController.login(req);
    res.status(response.code).send(response);
});

router.delete('/logout', async(req, res) => {
    const response = await authController.logout(req);
    res.status(response.code).send(response);
});

module.exports = router;