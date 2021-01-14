import React from "react";
import { Link } from 'react-router-dom';

const Header = () =>{

    function editBoardName(){

    }

    return(
        <div className={"row"}>
            <button id = "back-to-profile-btn">
                <Link to="/profile">Back to profile</Link>
            </button>
            <p className={"page-header"}>Kanban Board</p>
            <button class = "edit-board-btn">...
            <div class="dropdown-edit-board">
                <a onClick={editBoardName}>Edit board name</a>
                <a href="#">Invite collaborator</a>
                <a href="#">Export to PDF</a>
                <a href="#" style={{color: "darkred"}}>Delete board</a>
            </div>
            </button>
        </div>
    )
}


export default Header;
