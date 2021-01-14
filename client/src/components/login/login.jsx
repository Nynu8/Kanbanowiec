import React, {useState} from "react";
import ReactDOM from "react-dom";
import { boolean } from "yargs";
import { App } from "../../app/App";
import loginImg from "../../assets/images/logo.png"
import httpClient from "../../tools/httpClient";
import WaitingWindow from "../waitingWindow"




export class Login extends React.Component{
    
    
    static LoginProps={
        containerRef: React.createRef()
    }

    constructor(props){
        super(props);
        this.state={
            showWindow: "hidden"
        };
        this.login=this.login.bind(this);
    };

    async login(e, Username, Password){
        e.preventDefault();
        try{
            await httpClient.loginUser({
                username: Username,
                password: Password
            });
        }
        catch(err){
            console.error(err);
        }
    }

    onSubmitClick(e){
    
        this.setState({
            showWindow: "visible"
        })
    
        var username = document.getElementById('username-field').value;
        var password = document.getElementById('password-field').value;
    
        this.login(e, username, password);
      }

    render(){
        return(
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
                    <input type="password" name="password" placeholder="password"/>
                </div>
                <input id="password-field" className="btn" type="submit" onClick={this.onSubmitClick} value="Login"/>
            </form>
        </div>
        <WaitingWindow show={this.state.showWindow}/>
        </div>);
    }
}

export default Login;