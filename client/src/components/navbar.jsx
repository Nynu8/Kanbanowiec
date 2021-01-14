import { Link } from 'react-router-dom';
import React, { useState } from "react";

export function Navbar(){

    

    const [clientStatus, setClientStatus] = useState("logging")

    if(clientStatus==="logging"){
    return(
        <div id="loginNavbar">
        <h4>I don't have an account</h4>
        <Link to="/register" onClick={()=>{setClientStatus("registering")}} > <h3> Register</h3> </Link>
        <Link to="/board" onClick={()=>{setClientStatus("logged")}} >  Default board preview  </Link>
        <Link to="/profile" onClick={()=>{setClientStatus("logged")}}>  Default profile preview</Link>
        </div>
    )
    }
    else if(clientStatus==="registering"){
        return(
        <div id="loginNavbar">
            <h4>I already have an account</h4>
        <Link to="/login" onClick={()=>{setClientStatus("logging")}} ><h3>  Log in </h3> </Link>
        <Link to="/board" onClick={()=>{setClientStatus("logged")}}>  Default board preview  </Link>
        <Link to="/profile" onClick={()=>{setClientStatus("logged")}}>  Default profile preview</Link>
        </div>
        )
    }
    else{
        return(
            <div id="loginNavbar">
                <h4>Hello, User!</h4>
            <Link to="/login" onClick={()=>{setClientStatus("logging")}} ><h4> Log Out</h4>   </Link>
            <Link to="/board" >  Default board preview  </Link>
            <Link to="/profile" >  Default profile preview</Link>
            </div>
            )
    }
}