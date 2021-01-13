import React from "react";
import { Link } from 'react-router-dom';

const Header = () =>{
    return(
        <div className={"row"}>
            <button id = "back-to-profile-btn">
                <Link to="/profile">Back to profile</Link>
            </button>
            <p className={"page-header"}>Kanban Board</p>
            <button id = "edit-board-btn">...</button>
        </div>
    )
}

export default Header;