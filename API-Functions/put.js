const Orders = require("../Models/NewOrder.js")

const updateOrderState = async (req, res) => {
        try{
                const reqData = req.body;
                const userId = req.params.id;
                const newState = reqData.State;
                const orderNo = reqData.OrderNo;
                const updatedOrder = await Orders.findOneAndUpdate(
                        {Userid: userId, OrderNo : orderNo},
                        {$set : {State : newState}},
                        {new : true}
                )

                if(!updatedOrder) {
                        res.status(404).json({ message : "Order not found" });
                        return
                }
                res.status(200).json({ message : "Successfully updated order status"});
        } catch(err){
                res.send(500).json({ message : err.message });
        }
}

module.exports = {
        updateOrderState
}