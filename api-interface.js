const express = require('express');
const get = require('./API-Functions/get.js')
const post = require('./API-Functions/post.js')
const router = express.Router();

//Get api's
router.get('/', get.testRoute);
router.get('/menu', get.getMenu);

//Post api's
router.post('/new-order', post.createOrder);

module.exports = router;