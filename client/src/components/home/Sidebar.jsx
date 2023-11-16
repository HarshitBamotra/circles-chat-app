import React, { useState } from "react";
import "./sidebar.css";
import axios from "axios";
import { Popover } from "@mui/material";
import accept from "../../images/correct.png";
import reject from "../../images/delete-button.png";
import { useNavigate } from "react-router-dom";


const Sidebar = (props) => {
    const navigate=useNavigate();
    const [email, setEmail] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);
    const user = props.user;
    // console.log(user)
    

    // Add friend functions

    function onChangeEmail(e) {
        setEmail(e.target.value);
    }
    async function handleSubmit(e) {
        e.preventDefault();
        const frObject = {
            receiver: email,
            sender: user.email,
        }
        try {
            const data = await axios.post("http://localhost:4000/addfriend", frObject);
            console.log(data);
            const temp = document.getElementById("input-field");
            temp.value = "";
        }
        catch (err) {
            console.log(err);
        }
    }



    // Popover
    function handlePopover(event) {
        // console.log(event.currentTarget);
        setAnchorEl(event.currentTarget);
    }
    function closePopover() {
        setAnchorEl(null);
    }
    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;




    // mapping friend list

    function FriendList({friend}) {
        // console.log(friend);
        function handleClick(){
            // console.log(friend);
            props.setFriend(friend);
        }
        return (
            <div onClick={handleClick}>
                {friend.email}
            </div>
        )
    }


    // mapping friend requests

    function MapFriendRequests({ email }) {

        // accept request
        async function acceptRequest(){
            const sendObject={
                sender:email,
                receiver:user.email
            }
            const data = await axios.post("http://localhost:4000/acceptfriend", sendObject);
            const temp = user.friendRequests;
            user.friendRequests = temp.filter(item => item.email!==email);
            console.log(user);
            props.func(user);
            closePopover();
        }


        return (
            <div className="popover-item">
                <div className="popover-text">{email}</div>
                <div className="popover-buttons">
                    <img src={accept} alt="" onClick={acceptRequest}></img>
                    <img src={reject} alt=""></img>
                </div>

            </div>
        )
    }






    return (
        <div className="sidebar">
            <div className="addfriend">
                <div>
                    add friend
                </div>
                <input placeholder="email" type="email" onChange={onChangeEmail} id="input-field"></input>
                <button onClick={handleSubmit}>send friend request</button>
            </div>
            <div className="friendlist">

                {
                    user?.friends?.length > 0 ? user.friends.map((item) => <FriendList key = {item.id} friend={item}></FriendList>) : <></>
                }

            </div>
            <div className="friendrequest" onClick={handlePopover}>
                Friend Requests
            </div>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={closePopover}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
            >
                <div className="popover-container">
                    {
                        user?.friendRequests?.length>0?user.friendRequests.map((item)=><MapFriendRequests key={item.id} email={item.email}></MapFriendRequests>):<div className="popover-norequest">no friend requests</div>
                    }
                </div>
            </Popover>
        </div>
    )
}

export default Sidebar;