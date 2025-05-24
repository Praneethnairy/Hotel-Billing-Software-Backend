const mongoose = require("mongoose");
const dbname = "HotelBilling";
const mongoURI = `mongodb+srv://praneethnairy:Pp9880055926@cluster0.za7qgo8.mongodb.net/${dbname}`;

const connectDB = async () => {
        try {
                await mongoose.connect(mongoURI);
                console.log(`Connected to DB : ${dbname} successfull!!`)
        } catch(err) {
                console.log(`Error occurred while connecting to db : ${dbname}`)
                process.exit(1);
        }
}

module.exports = connectDB;