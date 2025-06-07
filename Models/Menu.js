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
        Userid: {
                type: String,
                required: true
        },
        category: {
                type : String,
                required : true
        },
        items : [dishSchema]
}, { collection: 'Menu' })

menuSchema.virtual('user', {
        ref: 'User',
        localField: 'Userid',
        foreignField: 'id',
        justOne: true
});

const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;