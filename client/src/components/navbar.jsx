import { Link } from 'react-router-dom';
import React, { useState } from "react";
import loginImg from "../assets/images/logo.png"


export function Navbar(props){

    const [clientStatus, setClientStatus] = useState("logging")

    function logOut(){
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setClientStatus("logging");
    }

    if(props.status==="logging"){
    return(
        <div id="loginNavbar">
            <Link to="/register" onClick={()=>{setClientStatus("registering")}} > <h3>    Register</h3> </Link>
        <h4>    I don't have an account     </h4>
        

        </div>
    )
    }
    else if(props.status==="registering"){
        return(
        <div id="loginNavbar">
            <Link to="/login" onClick={()=>{setClientStatus("logging")}} ><h3>     Log in </h3> </Link>
            <h4>    I already have an account     </h4>
        

        </div>
        )
    }
    else{
        return(
            <div id="loginNavbar">

                <Link to="/login" onClick={logOut} > <h3>    Log out</h3> </Link>
                <h4>    Hello, {props.name}!</h4>
        
            </div>
            )
    }
}