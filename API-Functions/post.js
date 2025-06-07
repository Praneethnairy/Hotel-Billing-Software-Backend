const Orders = require("../Models/NewOrder.js")
const User = require("../Models/User.js")
const Menu = require("../Models/Menu.js")
const crypto = require('node:crypto')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const createOrder = async (req, res) => {
        try{
                const userId = req.params.id;
                req.body.state = 1;
                const orderData = {
                        ...req.body,
                        Userid: userId,
                        Date: Date.now()
                }
                const order = new Orders(orderData);
                const qres = await order.save();
                res.status(200).json({"message" : "Successfully placed order!!"})
        } catch(err){
                res.send(500);
        }
}

//Sign up user
const createUser = async (req, res) => {
        try{
                const data = req.value;
                const dataToHash = data.password.trim().toLowerCase() + data.email.trim().toLowerCase();

                const generatedId = crypto.createHash('sha256')
                        .update(dataToHash)
                        .digest('hex');
                const existingUsr = await User.findOne({ id : generatedId});
                if(existingUsr){
                        res.status(400).json({message:"User already exists"});
                        return;
                }
                const salt = await bcrypt.genSalt(10);
                const passwd = await bcrypt.hash(data.password, salt);
                const user = new User({
                        id: generatedId,
                        username: data.username,
                        hotelname: data.hotelname,
                        email: data.email,
                        password: passwd
                });
                const qres = await user.save();
                res.status(200).json({"message" : "Successfully placed user!!"})
        } catch(err) {
                res.send(500).json({"message": err.message});
        }
}

const signInUser = async (req, res) => {
        try {
                const dataToHash = req.body.password.trim().toLowerCase() + req.body.email.trim().toLowerCase();
                const generatedId = crypto.createHash('sha256')
                        .update(dataToHash)
                        .digest('hex');
                const user = await User.findOne({ id : generatedId});
                if(!user){
                        res.status(400).json({message:"Invalid email or password"});
                }
                else{
                        const payload = {
                                user: {
                                        email: user.email,
                                        password: user.password
                                }
                        }
                        const token = jwt.sign(
                                payload,
                                user.id
                        );
                        res.status(200).json({"message" : "Successfully logged in", "token" : token, "id": user.id, "hotel" : user.hotelname, "username": user.username});
                }
        } catch(err) {
                res.send(500).json({"message": err.message});
        }
}

const createDish = async (req, res) => {
        try{
                const data_t = {
                        key: 1,
                        Userid: req.params.id,
                        category: req.body.category,
                        items: []
                }
                const totalMenuItems = await Menu.countDocuments({Userid: req.params.id});
                const totalCategory = await Menu.countDocuments({Userid: req.params.id, category: data_t.category});
                if(totalCategory){
                        data_t.key = totalCategory + 1;
                        const category = await Menu.findOne({Userid: req.params.id, category: data_t.category});
                        const existingDish = category.items.find(i => i.item === req.body.item);
                        if(existingDish){
                                res.status(400).json({message:"Dish already exists"});
                                return;
                        }
                        const dish_size_t = category.items.length;
                        const dish_key = dish_size_t+1;
                        const dish_struct = {
                                key : dish_key,
                                item : req.body.item,
                                cost : Number(req.body.cost)
                        }
                        await Menu.updateOne(
                                {Userid: req.params.id, category: data_t.category}, // Filter to target the specific document
                                { $push: { items: dish_struct } }  // The update operation
                        );
                }
                else {
                        data_t.key = totalMenuItems+1;
                        const dish_struct = {
                                key : 1,
                                item : req.body.item,
                                cost : Number(req.body.cost)
                        }
                        data_t.items.push(dish_struct);
                        const menu = new Menu(data_t);
                        const qres = await menu.save();
                }

                res.status(200).json({"message" : "Successfully created menu item!!"})
        } catch (e) {
                res.status(500).json({"message": e.message});
        }
}

module.exports = {
        createOrder,
        createUser,
        signInUser,
        createDish,
}