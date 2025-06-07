const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

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
        },
        Payment: {
                type : String,
                required : true
        }
}, {_id : false});

const orderInfo = new mongoose.Schema({
        Userid: {
                type: String,
                required: true
        },
        OrderNo : {
                type : Number,
        },
        CartItems: [cartItem],
        TotalValue: {
                type : Number,
                required : true
        },
        UserDetails: userInfo,
        State: {
                type : Number,
                default: 1,
                required : true
        },
        Date: {
                type: Number,
                required : true
        }
}, { collection: 'Orders' });

orderInfo.virtual('user', {
        ref: 'User',
        localField: 'Userid',
        foreignField: 'id',
        justOne: true
});

orderInfo.plugin(AutoIncrement, {inc_field : 'OrderNo'});
const Orders = mongoose.model('Orders', orderInfo);

module.exports = Orders;