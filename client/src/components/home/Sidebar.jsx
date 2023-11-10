import React, { useState } from "react";
import "./sidebar.css";
import axios from "axios";
import { Popover } from "@mui/material";

const Sidebar = (props) => {
    const [email, setEmail] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);





    function onChangeEmail(e) {
        setEmail(e.target.value);
    }



    async function handleSubmit(e) {
        e.preventDefault();
        const frObject = {
            receiver: email,
            sender: props.props.email,
        }
        try {
            const data = await axios.post("http://localhost:4000/addfriend", frObject);
            console.log(data);
        }
        catch (err) {
            console.log(err);
        }
    }



    function handlePopover(event) {
        // console.log(event.currentTarget);
        setAnchorEl(event.currentTarget);
    }

    function closePopover(){
        setAnchorEl(null);
    }
    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;


    return (
        <div className="sidebar">
            <div className="addfriend">
                <div>
                    add friend
                </div>
                <input placeholder="email" type="email" onChange={onChangeEmail}></input>
                <button onClick={handleSubmit}>send friend request</button>
            </div>
            <div className="friendlist">
                <div>
                    harshitbamotra.01@gmail.com
                </div>
                <div>
                    harshitbamotra.01@gmail.com
                </div>
                <div>
                    harshitbamotra.01@gmail.com
                </div>
                <div>
                    harshitbamotra.01@gmail.com
                </div>
                <div>
                    harshitbamotra.01@gmail.com
                </div>
                <div>
                    harshitbamotra.01@gmail.com
                </div>
                <div>
                    harshitbamotra.01@gmail.com
                </div>
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
                    <div className="popover-item">something is wrong</div>
                    <div className="popover-item">something is wrong</div>
                    <div className="popover-item">something is wrong</div>
                    <div className="popover-item">something is wrong</div>
                    <div className="popover-item">something is wrong</div>
                    <div className="popover-item">something is wrong</div>
                </div>
            </Popover>
        </div>
    )
}

export default Sidebar;