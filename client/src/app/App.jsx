import React, { useState } from "react";
import { Type } from "typescript";
import { boolean } from "yargs";
import "../assets/styles/App.css";
import { Login, Register } from "../components/login/index";
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import {Navbar} from '../components/navbar'
import BoardPage from "../pages/boardPage";
import UserPage from "../pages/userPage";
import { render } from "@testing-library/react";


export function App(){

  var [currentPath, redirect] = useState("login");

  return(
    <main>
      <Switch>
      <Route path='/login'  component={Login} />
      <Route path='/register'><Register /></Route>
      <Route path='/board' component={BoardPage}/>
      <Route path="/profile" component={UserPage}/>      
      </Switch>
      <Redirect to={currentPath} />)
    </main>
  )
}