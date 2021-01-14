import React, { useState } from "react";
import { Type } from "typescript";
import { boolean } from "yargs";
import "../assets/styles/App.css";
import { Login, Register } from "../components/login/index";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {Navbar} from '../components/navbar'
import BoardPage from "../pages/boardPage";
import UserPage from "../pages/userPage";

export function App(){

  //const [stage, setStage] = useState("logging");


  return(
    <main>
      <Navbar/>
      <Switch>
      <Route path='/login'  component={Login} />
      <Route path='/register' component={Register} />
      <Route path='/board' component={BoardPage}/>
      <Route path="/profile" component={UserPage}/>      
      </Switch>
    </main>
  )
}