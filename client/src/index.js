// import React from 'react';
// import ReactDOM  from 'react-dom';
// import App from './App';
// ReactDOM.render(
    
//     <App></App>
//     ,
//     document.getElementById('root')
// );
import {BrowserRouter} from "react-router-dom";
import {createRoot} from "react-dom/client";
import App from "./App";
const domNode = document.getElementById('root');
const root = createRoot(domNode);
root.render(
    <BrowserRouter>
        <App></App>
    </BrowserRouter>
);