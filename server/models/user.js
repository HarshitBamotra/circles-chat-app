const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required: true,
        unique:true
    },
    password:{
        type:String,
        required: true
    },
    friends:[{
        id:String,
        email:String,
        chats:[
            {
                sender:String,
                content:String,
                time:String
            }
        ]
    }],
    friendRequests:[{
        id:String,
        email:String
    }],
});


const userModel = new mongoose.model("user", userSchema);
module.exports = userModel;