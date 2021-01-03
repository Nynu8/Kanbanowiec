import { Link } from 'react-router-dom';
import React from "react";

export function Navbar(){
    return(
        <div id="loginNavbar">
        <Link to="/login">  Login  </Link>
        <Link to="/register">  Register  </Link>
        <Link to="/board">  Default board preview</Link>
        </div>
    )
}