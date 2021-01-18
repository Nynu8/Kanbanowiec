import React from "react";
import ReactDOM from "react-dom";
import loginImg from "../../assets/images/logo.png";
import httpClient from "../../tools/httpClient";
import WaitingWindow from "../waitingWindow"
import { useHistory } from "react-router-dom";
import { App } from "../../app/App";
import { Redirect } from "react-router-dom";
import UserPage from "../../pages/userPage";
import { Link } from 'react-router-dom';
import {Navbar} from '../navbar'

export class Register extends React.Component {
  static RegisterProps = {
    containerRef: React.createRef(),
  };


  constructor(props) {
    super(props);
    this.state={
    showWindow: "hidden"
    }
    this.onSubmitClick = this.onSubmitClick.bind(this);
  }

  async register(e, Username, Name, Surname, Password, ConfirmPassword) {
    e.preventDefault();
    try {
      await httpClient.registerUser({
        username: Username,
        password: Password,
        confirmPassword: ConfirmPassword,
        name: Name,
        surname: Surname,
      });
      
      document.getElementById("to-user-page-link").click();
      
    } 
    catch (err) {
      //display error somehow
      console.error(err.message);
      alert("You cannot register like that! "+err)
    }

  }

  onSubmitClick(e){
    //showWindow = "visible";

    var username = document.getElementById('username-field').value;
    var name = document.getElementById('name-field').value;
    var surname = document.getElementById('surname-field').value;
    var password = document.getElementById('password-field').value;
    var confirmPassword = document.getElementById('confirm-password-field').value;

    this.register(e, username, name, surname, password, confirmPassword);
  }
  

  render() {
    return (
      <div>
        <Navbar status="registering" />
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Register</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} />
          </div>
          <form className="form">
            <div className="form-group">    
              <label htmlFor="username">Username</label>
              <input type="text" id='username-field' name="username" placeholder="username" />
            </div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name-field" name="name" placeholder="name" />
            </div>
            <div className="form-group">
              <label htmlFor="surname">Surname</label>
              <input type="text" id="surname-field" name="surname" placeholder="surname" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password-field" name="password" placeholder="password" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Confirm password</label>
              <input type="password" id="confirm-password-field" name="password" placeholder="password" />
            </div>
            <input type="submit" value="Register" onClick={this.onSubmitClick} className="btn"/>
          </form>
        </div>
        <WaitingWindow show={this.state.showWindow}/>
        <Link to="/profile" id="to-user-page-link"/>
      </div>
      </div>
    );
  }
}

export default Register;