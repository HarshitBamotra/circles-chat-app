const mongoose = require("mongoose");
require("dotenv").config();
const MONGO_URL = process.env.MONGO_URL;
mongoose.connect(MONGO_URL).then(
    ()=>{
        console.log("Mongo Db connected successfully");
    }
).catch(
    (err)=>{
        console.log(err);
    }
)