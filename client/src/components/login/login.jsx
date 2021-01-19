import React, {useState} from "react";
import ReactDOM from "react-dom";
import { boolean } from "yargs";
import { App } from "../../app/App";
import loginImg from "../../assets/images/logo.png"
import httpClient from "../../tools/httpClient";
import WaitingWindow from "../waitingWindow"
import { Navbar } from "../navbar"
import { Link } from 'react-router-dom';


export class Login extends React.Component{
    
    
    static LoginProps={
        containerRef: React.createRef()
    }

    constructor(props){
        super(props);
        this.state={
            showWindow: "hidden"
        };
        this.onSubmitClick=this.onSubmitClick.bind(this);
    };

    async login(e, Username, Password){
        e.preventDefault();
        try{
           var tokens =  await httpClient.loginUser({
                username: Username,
                password: Password
            });
            localStorage.setItem("accessToken",tokens.accessToken);
            localStorage.setItem("refreshToken",tokens.refreshToken);
            document.getElementById("to-user-page-link").click();
        }
        catch(err){
            console.error(err.message);
      alert("You cannot log in like that! "+err)
        }
    }

    onSubmitClick(e){
        var username = document.getElementById('username-field').value;
        var password = document.getElementById('password-field').value;
    
        this.login(e, username, password);
      }

    render(){
        return(
            <div>
                <Navbar status="logging" />
        <div className="base-container" ref={this.props.containerRef}>
            <div className="header">Login</div>
            <div className="content">
            <div className="image">
                <img src={loginImg} />
            </div>
            <form className="form">
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input id="username-field" type="text" name="username" placeholder="username"/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password-field" name="password" placeholder="password"/>
                </div>
                <input className="btn" type="submit" onClick={this.onSubmitClick} value="Login"/>
            </form>
        </div>
        <WaitingWindow show={this.state.showWindow}/>
        <Link to="/profile" id="to-user-page-link"/>
        </div>
        </div>);
    }
}

export default Login;