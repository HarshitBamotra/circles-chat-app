const bcrypt = require("bcryptjs")

const hashedPassword = async(password)=>{
    return await bcrypt.hash(password,12);
}

module.exports = hashedPassword;