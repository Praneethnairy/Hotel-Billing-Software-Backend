const Menu = require("../Models/Menu.js");
const Orders = require("../Models/NewOrder.js");

const testRoute = (req, res) => {
        res.send('Hello world!!');
}

const getMenu = async (req, res) => {
        try{
                const userId = req.params.id;
                const menu = await Menu.find({Userid: userId}).sort({key:1});
                res.status(200).send(menu);
        } catch(err) {
                res.status(500).json({message: err.message});
        }
}

const getPendingOrders = async (req, res) => {
        try{
                const { state } = req.query;
                const userId = req.params.id;
                const orders = await Orders.find({Userid: userId, State: state});
                res.status(200).send(orders);
        } catch(err) {
                res.status(500).json({message: err.message});
        }
}

const getStats = async (req, res) => {
        try{
                const userId = req.params.id;
                const orderReceived = await Orders.countDocuments({Userid: userId});
                const orderDelivered = await Orders.countDocuments({Userid: userId, State: 3});
                const pendingOrders = await Orders.countDocuments({Userid: userId, State: 1});
                const readyOrders = await Orders.countDocuments({Userid: userId, State: 2});
                const cancelledOrders = await Orders.countDocuments({Userid: userId, State: 4});
                const cashMode = await Orders.countDocuments({Userid: userId, "UserDetails.Payment" : "Cash"});
                const cardMode = await Orders.countDocuments({Userid: userId, "UserDetails.Payment" : "Card"});
                const UPIMode = await Orders.countDocuments({Userid: userId, "UserDetails.Payment" : "UPI"});

                res.status(200).json({
                        "orderReceived": orderReceived,
                        "orderDelivered": orderDelivered,
                        "orderStatusCnt": [pendingOrders, readyOrders, orderDelivered, cancelledOrders],
                        "modeCnt" : [cashMode, cardMode, UPIMode]
                })
        } catch(err) {
                res.status(500).json({message: err.message});
        }
}

module.exports = {
        testRoute,
        getMenu,
        getPendingOrders,
        getStats
}