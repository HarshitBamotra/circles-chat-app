import React from "react";
import Login from "./components/auth/Login";
import "./App.css";
import {Routes, Route} from "react-router-dom"
import Main from "./components/home/Main";
const App = ()=>{
    return(
        <div className="app">
            <Routes>
                <Route path="/auth" element={<Login></Login>}></Route>
                <Route path="/" element={<Main></Main>}></Route>
            </Routes>
            {/* <Login></Login> */}
        </div>
    )
}

export default App;