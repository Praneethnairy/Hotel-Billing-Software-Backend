const express = require('express');
const get = require('./API-Functions/get.js')
const post = require('./API-Functions/post.js')
const put = require('./API-Functions/put.js')
const middleware = require('./Middleware/middleware.js')
const router = express.Router();

//Get api's
router.get('/', get.testRoute);
router.get('/:id/menu', middleware.validateAuthToken, get.getMenu);
router.get('/:id/orders', middleware.validateAuthToken, get.getPendingOrders);
router.get('/:id/get-stats', middleware.validateAuthToken, get.getStats);

//Post api's
router.post('/:id/new-order', middleware.validateAuthToken, post.createOrder);
router.post('/sign-up', middleware.validateNewUser, post.createUser);
router.post('/sign-in', post.signInUser);
router.post('/:id/new-dish', middleware.validateAuthToken, post.createDish);

//Put api's
router.put('/:id/update-order-status', middleware.validateAuthToken, put.updateOrderState);

module.exports = router;