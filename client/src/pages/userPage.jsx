import React, {useState} from "react";
import { App } from "../app/App";
import BoardPage from "./boardPage";

const UserPage = () => {

    return(
        <div>
        <header id="user-header">User's page</header>
        <div class="user-container">
            <div class="boardlist-container">
                <h2 class="user-container-header">Boards list</h2>
                <ul>

                </ul>
            </div>
            <div class="settings-container">
                <h2 class="user-container-header">Settings</h2>
                <button id="edit-username-btn">Edit Username</button>
                <button id="edit-name-btn">Edit Name</button>
                <button id="edit-surname-btn">Edit Surname</button>
                <button id="edit-password-btn">Change Password</button>
                <button id="delete-account-btn">Delete Account</button>
            </div>
        </div>
        </div>
    )
}

export default UserPage