const express = require('express');
const get = require('./API-Functions/get.js')
const post = require('./API-Functions/post.js')
const put = require('./API-Functions/put.js')
const router = express.Router();

//Get api's
router.get('/', get.testRoute);
router.get('/menu', get.getMenu);
router.get('/orders', get.getPendingOrders);

//Post api's
router.post('/new-order', post.createOrder);

//Put api's
router.put('/update-order-status', put.updateOrderState);

module.exports = router;