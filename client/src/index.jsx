import React, {useState} from "react";
import ReactDOM from "react-dom";
import "./assets/styles/index.css";
import { App } from "./app/App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';


ReactDOM.render(

  <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.getElementById('root')
    
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
