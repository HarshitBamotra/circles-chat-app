import React, { useEffect, useState } from "react";
import "./main.css";
import Sidebar from "./Sidebar";
import Chatarea from "./ChatArea";
import { useNavigate } from "react-router-dom";
import {useCookies} from "react-cookie";
import axios from "axios";
const Main = ()=>{
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    useEffect(()=>{
        const verifyCookie = async ()=>{
            if(!cookies.token){
                navigate("/auth");
            }
            const data = await axios.post("http://localhost:4000/",{},{withCredentials:true});
            console.log(data);
            if(data.status===false){
                removeCookie("token");
                navigate("/auth")
            }
            console.log(data.data.email);
            setUser({
                email:data.data.email,
                id:data.data.id,
                friends:data.data.friends,
                friendRequests:data.data.friendRequests
            })
        }
        verifyCookie();
    },[cookies, navigate, removeCookie]);
    console.log(user);

    return(
        <div className="main">
            <div className="sbar">
                <Sidebar props={user}></Sidebar>
            </div>
            <div className="carea">
                <Chatarea></Chatarea>
            </div>
        </div>
    )
}

export default Main;