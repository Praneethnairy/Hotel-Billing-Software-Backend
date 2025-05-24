const mongoose = require("mongoose");

const dishSchema = new mongoose.Schema({
        key: {
                type : Number,
                required : true
        },
        item: {
                type : String,
                required : true
        },
        cost: {
                type : Number,
                required : true
        }
} ,{ _id: false })

const menuSchema = new mongoose.Schema({
        key: {
                type : Number
        },
        category: {
                type : String,
                required : true
        },
        items : [dishSchema]
}, { collection: 'Menu' })

const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;