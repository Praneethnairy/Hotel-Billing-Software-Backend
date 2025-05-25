const Menu = require("../Models/Menu.js");
const Orders = require("../Models/NewOrder.js");

const testRoute = (req, res) => {
        res.send('Hello world!!');
}

const getMenu = async (req, res) => {
        try{
                const menu = await Menu.find();
                res.status(200).send(menu);
        } catch(err) {
                res.status(500);
        }
}

const getPendingOrders = async (req, res) => {
        try{
                const { state } = req.query;
                const orders = await Orders.find({State: state});
                res.status(200).send(orders);
        } catch(err) {
                res.status(500);
        }
}

module.exports = {
        testRoute,
        getMenu,
        getPendingOrders
}