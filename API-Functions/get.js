const Menu = require("../Models/Menu.js");

const testRoute = (req, res) => {
        res.send('Hello world!!');
}

const getMenu = async (req, res) => {
        try{
                const menu = await Menu.find();
                res.status(200).send(menu);
        } catch(err) {
                res.status(400);
        }
}

module.exports = {
        testRoute,
        getMenu
}