import { Link } from 'react-router-dom';
import React, { useState } from "react";


export function Navbar(props){


    const [clientStatus, setClientStatus] = useState("logging")

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
                <Link to="/register" onClick={()=>{setClientStatus("registering")}} > <h3>    Log out</h3> </Link>
                <h4>    Hello, User!</h4>
           

            </div>
            )
    }
}