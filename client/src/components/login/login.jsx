import React, {useState} from "react";
import ReactDOM from "react-dom";
import { boolean } from "yargs";
import { App } from "../../app/App";
import loginImg from "../../assets/images/logo.png"
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
    };

    

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
                    <input type="text" name="username" placeholder="username"/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" placeholder="password"/>
                </div>
                <input className="btn" type="submit" onClick={()=>this.setState({showWindow: "visible"})} value="Login"/>
            </form>
        </div>
        <WaitingWindow show={this.state.showWindow}/>
        </div>);
    }
}

export default Login;