const express = require('express');
const cors = require('cors');
const apiRoutes = require("./api-interface.js")
const connectDB = require("./db-connect.js");

const port = process.env.PORT || 5000;
const app = express();

connectDB();
const corsOptions = {
	origin: 'http://localhost:3000',
	optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());
app.use('/api', apiRoutes);

if(require.main === module) {
        app.listen(port, ()=>console.log(`Listening to port ${port}....`))
}