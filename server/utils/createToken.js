require("dotenv").config();

const jwt = require("jsonwebtoken");

const createToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_TOKEN);
}

module.exports = createToken;