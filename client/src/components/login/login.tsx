import React from "react";
import ReactDOM from "react-dom";
import loginImg from "../../assets/images/logo.png"

type LoginProps = {
    containerRef: any;
}

export class Login extends React.Component<LoginProps> {

    //public containerRef = React.createRef<HTMLDivElement>();
    static LoginProps={
        containerRef: React.createRef<string>()
    }

    constructor(props: any){
        super(props);
    };

    public render(){
        return(
        <div className="base-container" ref={this.props.containerRef}>
            <div className="header">Login</div>
            <div className="content">
            <div className="image">
                <img src={loginImg} />
            </div>
            <div className="form">
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" placeholder="username"/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" placeholder="password"/>
                </div>
            </div>
        </div>
        <div className="footer">
            <button type="button" className="btn">Login</button>
        </div>
        </div>);
    }
}