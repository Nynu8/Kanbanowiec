import React from "react";
import ReactDOM from "react-dom";
import loginImg from "../../assets/images/logo.png";
import httpClient from "../../tools/httpClient";
import WaitingWindow from "../waitingWindow"

export class Register extends React.Component {
  static RegisterProps = {
    containerRef: React.createRef(),
  };

  constructor(props) {
    super(props);
    this.state={
    showWindow: "hidden"
    }
    this.register = this.register.bind(this);
  }

  async register(e) {
    e.preventDefault();
    try {
      await httpClient.registerUser({
        username: "lolo",
        password: "abcd",
        confirmPassword: "abcd",
        name: "piss",
        surname: "mememe",
      });
    } catch (err) {
      //display error somehow
      console.error(err);
    }
  }

  onSubmitClick(e){
    this.setState({showWindow: "visible"});
    this.register(e)
  }
  

  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Register</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} />
          </div>
          <form className="form">
            <div className="form-group">    
              <label htmlFor="username">Username</label>
              <input type="text" name="username" placeholder="username" />
            </div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" name="name" placeholder="name" />
            </div>
            <div className="form-group">
              <label htmlFor="surname">Surname</label>
              <input type="text" name="surname" placeholder="surname" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" placeholder="password" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Repeat password</label>
              <input type="password" name="password" placeholder="password" />
            </div>
            <input type="submit" value="Register" onClick={this.onSubmitClick} className="btn"/>
          </form>
        </div>
        <WaitingWindow show={this.state.showWindow}/>
      </div>
    );
  }
}

export default Register;