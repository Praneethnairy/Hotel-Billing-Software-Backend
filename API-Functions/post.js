const Orders = require("../Models/NewOrder.js")

const createOrder = async (req, res) => {
        try{
                const order = new Orders(req.body);
                const qres = await order.save();
                res.status(200).json({"message" : "Successfully placed order!!"})
        } catch(err){
                res.send(400);
        }
}

module.exports = {
        createOrder
}