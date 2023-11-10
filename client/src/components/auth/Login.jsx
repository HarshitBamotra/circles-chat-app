import React, { useState } from "react";
import axios from "axios";
import "./login.css";
import { useNavigate } from "react-router-dom";
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function handleOnchangeEmail(e){
        setEmail(e.target.value);
    }
    function handleOnchangePassword(e){
        setPassword(e.target.value);
    }


    async function handleSubmit(){
        const submitObject = {
            email:email,
            password:password
        }
        try{
            const data = await axios.post("http://localhost:4000/auth", submitObject, {withCredentials:true});
            console.log(data);
            navigate("/");
        }
        catch(err){
            console.log(err);
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-container">
                <div className="auth-heading">
                    CIRCLES
                </div>
                <div className="auth-form">
                    <div className="auth-input">
                        <div>
                            email
                        </div>
                        <input type="email" onChange={handleOnchangeEmail}></input>
                    </div>
                    <div className="auth-input">
                        <div>
                            password
                        </div>
                        <input type="password" onChange={handleOnchangePassword}></input>
                    </div>
                    <div className="auth-submit-button" onClick={handleSubmit}>sign up/ sign in</div>
                </div>
            </div>



            <div className="circle yellow"></div>
            <div className="circle pink"></div>
            <div className="circle blue"></div>
        </div>
    )
}


export default Login;