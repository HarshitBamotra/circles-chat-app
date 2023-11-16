const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const cookies = require("cookie-parser");

require("./db/conn");
require('dotenv').config();


const hashpassword = require("./utils/hashpassword");
const createToken = require("./utils/createToken");
const userVerification = require("./utils/userVerification");
const User = require("./models/user");
const port = process.env.PORT;

const app = express();


app.use(express.json());
app.use(cors({credentials: true, origin: true}));
app.use(cookies());

app.post("/auth", async (req, res)=>{
    try{
        const email = req.body.email;
        const password = req.body.password;

        let user = await User.findOne({email})
        if(user){
            const auth = await bcrypt.compare(password, user.password);
            if(!auth){
                res.json("Incorrect Email or Password");
            }
            console.log("login")
        }
        else{
            const hashedPassword = await hashpassword(password);
            user = await User.create({
                email: email,
                password: hashedPassword
            })
            console.log("signup")
        }
        const token = createToken(user._id);
        res.cookie("token",token, {
            withCredentials: true,
            httpOnly: false,
        });
        res.json("user signed in successfully");
    }
    catch(err){
        console.log(err);
    }
})

app.post("/", async (req,res)=>{

    console.log(req.cookies);

    const temp = userVerification(req);
    console.log(temp);
    if(temp.status===false){
        res.json(temp);
    }
    else{
        const user = await User.findById(temp.id);

        res.json({
            status:temp.status,
            email:user.email,
            friends: user.friends,
            friendRequests:user.friendRequests,
            id: user._id
        });
    }
})


app.post("/addfriend", async (req,res)=>{
    const sender = req.body.sender;
    const receiver = req.body.receiver;
    console.log(req.body);
    const user1 = await User.findOne({email:sender});
    const user2 = await User.findOne({email:receiver});
    console.log(user2);
    await User.updateOne(
        {_id:user2._id}, 
        {$push:{
            friendRequests:{
                email:user1.email,
                id:user1._id
            }}
        },
    );
    res.json("Friend request sent successfuly");
});

app.post("/acceptfriend", async(req,res)=>{
    const sender = req.body.sender;
    const receiver = req.body.receiver;
    console.log(req.body);
    const user1 = await User.findOne({email:sender});
    const user2 = await User.findOne({email:receiver});
    await User.updateOne(
        {_id:user2._id},
        {
            $push:{
                friends:{
                    email:user1.email,
                    id:user1._id
                }
            }
        }
    )
    await User.updateOne(
        {_id:user1._id},
        {
            $push:{
                friends:{
                    email:user2.email,
                    id:user2._id
                }
            }
        }
    )

    await User.updateOne(
        {_id:user2._id},
        {
            $pull:{
                friendRequests:{
                    email:user1.email,
                    id:user1._id
                }
            }
        }
    );
    res.json("Friend request accepted");
})


app.post("/chat", async(req,res)=>{
    console.log(req.body);

    const user1 = req.body.sender;
    const user2 = req.body.receiver;
    const message = req.body.message;
    await User.updateOne(
        {email:user1, "friends.email":user2},
        {
            $push:{
                "friends.$.chats":{
                    sender:user1,
                    content:message
                }
            }
        }
    )
    await User.updateOne(
        {email:user2, "friends.email":user1},
        {
            $push:{
                "friends.$.chats":{
                    sender:user1,
                    content:message
                }
            }
        }
    )
    res.json("ooooo");
})


app.listen(port, ()=>{
    console.log("app listening on port: ", port);
})