import React, { useState } from "react";
import "./chatarea.css";
import logout from "../../images/logout.png";
import { useCookies } from "react-cookie";
// import remove from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function MapChat(props) {
    console.log(props);

    return (
        <div>
            <div>

            </div>
            <div>

            </div>
        </div>
    )

}
 


const Chatarea = (props) => {
    console.log(props);
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [cookie,setCookie ,removeCookie] = useCookies([]);
    

    function deleteCookie() {
        // setCookie('myCookie', '', { expires: new Date(0) });
        removeCookie("token");
        // browser.cookies.remove("token")
        navigate("/auth");
    }

    function onChangeInput(e) {
        setMessage(e.target.value);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const submitObject = {
            message: message,
            receiver:props.friend.email,
            sender:props.user.email
        }
        const data = await axios.post("http://localhost:4000/chat", submitObject);
        console.log(data.data);
        const temp = document.getElementById("inp");
        temp.value = "";
    }
    return (
        <div className="chatarea">
            <div className="chatarea-header">
                <div>
                    {props.friend.email}
                </div>
                <img src={logout} alt="" onClick={deleteCookie}></img>
            </div>
            <div className="chatarea-chats">

            </div>
            <div className="chatarea-input">
                <form onSubmit={handleSubmit}>
                    <input onChange={onChangeInput} id="inp"></input>
                </form>
            </div>
        </div>
    )
}

export default Chatarea