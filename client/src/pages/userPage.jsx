import React, {useState} from "react";
import { App } from "../app/App";
import WaitingWindow from "../components/waitingWindow";
import BoardPage from "./boardPage";
import {Navbar} from "../components/navbar";
import {Link} from "react-router-dom";


const UserPage = () => {


    var [settingsWindowVisibility,  setSettingsWindowVisibility] = useState("hidden");

    function setSettingsWindow(visibility, settingNr, e){
        e.preventDefault();
        setSettingsWindowVisibility(()=>{
            settingsWindowVisibility = `${visibility}`;
            return settingsWindowVisibility;
        })
        if(visibility==="hidden"){
       
        }
        else if(visibility==="visible"){
            switch(settingNr){
                case 1:
                    document.getElementById("settings-h3").textContent = "Enter new username:";
                    break;
                case 2:
                    document.getElementById("settings-h3").textContent = "Enter new name:";
                    break;
                case 3: 
                    document.getElementById("settings-h3").textContent = "Enter new surname:";
                    break;
                case 4:
                    var window = document.getElementById("settings-window");
                    var changePassword = document.getElementById("setting-input");
                    var repeatPassword = document.createElement("input");
                    var repeatPasswordLabel = document.createElement("h3");
                    changePassword.type = "password";
                    repeatPassword.type = "password";
                    repeatPassword.id = "repeat-password";
                    repeatPasswordLabel.is = "repeat-password-label"
                    repeatPassword.style.border = "1px solid black";
                    repeatPasswordLabel.textContent = "Repeat password:";
                    document.getElementById("settings-h3").textContent = "Enter new password:";
                    window.appendChild(repeatPasswordLabel);
                    window.appendChild(repeatPassword);

                    break;
            }
            document.getElementById("setting-submit-btn").addEventListener('click', ()=>{
                saveNewValue(settingNr)
            })
        }


    }

    function saveNewValue(settingNr){
        var window = document.getElementById("settings-window");
            if(settingNr===4){
                window.removeChild(window.lastChild);
                window.removeChild(window.lastChild);
            }
            setSettingsWindowVisibility(()=>{
               settingsWindowVisibility = "hidden";
               return settingsWindowVisibility;
            })
    }

    return(
        <div>
            <Navbar status="logged" />
        <header id="user-header">User's page</header>
        <div className="user-container">
            <div className="boardlist-container">
                <h2 className="user-container-header">Boards list</h2>
                <ul>
                    <button>
                        <Link to="/board" id="to-user-board-link">Board 1</Link>
                    </button>
                </ul>
                <button>CREATE BOARD</button>
            </div>
            <div className="settings-container">
                        <div className="user-settings-window" id="settings-window" style={{visibility: `${settingsWindowVisibility}` }}>
                                <button style={{position: "absolute", marginLeft: "230px"}} onClick={(e)=>setSettingsWindow("hidden",0,e)}>X</button>
                                <h3 id="settings-h3">Enter new value:</h3>
                                <input type="text" className="new-name" id="setting-input" name="text"/>
                                <input type="submit" id="setting-submit-btn" name="submit" value="Confirm"/>
                        </div>
                <h2 className="user-container-header">Settings</h2>
                <button id="edit-username-btn" onClick={(e)=>setSettingsWindow("visible",1,e)}>Edit Username</button>
                <button id="edit-name-btn" onClick={(e)=>setSettingsWindow("visible",2,e)}>Edit Name</button>
                <button id="edit-surname-btn" onClick={(e)=>setSettingsWindow("visible",3,e)}>Edit Surname</button>
                <button id="edit-password-btn" onClick={(e)=>setSettingsWindow("visible",4,e)}>Change Password</button>
                <button id="delete-account-btn" >Delete Account</button>
            </div>
        </div>
        </div>
    )
}

export default UserPage;