const User = require("../models/user");
require("dotenv").config();
require("cookie-parser");

const jwt = require("jsonwebtoken");

const userVerification = (req)=>{
    // console.log(req.cookies);
    const token = req.cookies.token;
    if(!token){
        return {status:false};
    }
    let ret={};
    let id = "";
    jwt.verify(token, process.env.JWT_TOKEN, (err, data)=>{
        if(err){
            console.log(err);
            ret = {status:false};
        }
        else{
            id = data.id;
            ret = {status:true}
        }
    })
    if(ret.status===false){
        return {status:false};
    }
    return {status: true, id: id};
}

module.exports = userVerification;