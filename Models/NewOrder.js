const mongoose = require('mongoose');

const cartItem = new mongoose.Schema({
        key: {
                type : Number,
                required : true
        },
        name: {
                type : String,
                required : true
        },
        qty: {
                type : Number,
                required : true
        },
        cost: {
                type: Number,
                required: true
        }
}, {_id : false});

const userInfo = new mongoose.Schema({
        Name: {
                type : String,
                required : true
        },
        Address: {
                type : String,
                required : true
        },
        Contact: {
                type : String,
                required : true
        },
        Mode: {
                type : String,
                required : true
        }
}, {_id : false});

const orderInfo = new mongoose.Schema({
        CartItems: [cartItem],
        TotalValue: {
                type : Number,
                required : true
        },
        UserDetails: userInfo
}, { collection: 'Orders' });

const Orders = mongoose.model('Orders', orderInfo);

module.exports = Orders;