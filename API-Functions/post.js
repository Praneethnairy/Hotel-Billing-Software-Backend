const Orders = require("../Models/NewOrder.js")

const createOrder = async (req, res) => {
        try{
                req.body.state = 1;
                const order = new Orders(req.body);
                const qres = await order.save();
                res.status(200).json({"message" : "Successfully placed order!!"})
        } catch(err){
                res.send(500);
        }
}

module.exports = {
        createOrder
}