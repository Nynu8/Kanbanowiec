import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { statuses } from "../../data";

const Header = (props) =>{
    
    const [showEditBoardName, editEDBWindowVisibility] = useState("hidden");
    const [boardName, editBoardName] = useState(props.name);
    const [collaborator, addCollaborator] = useState("default");
    const [showAddCollaborator, editACVisibility] = useState("hidden");

    function editShow1(e){
        e.preventDefault();
        editEDBWindowVisibility(()=>{
            return "visible";
        })
    }

    function editShow2(e){
        e.preventDefault();
        editEDBWindowVisibility(()=>{
            return "hidden";
        })
    }
    function editShow3(e){
        e.preventDefault();
        editACVisibility(()=>{
            return "visible";
        })
    }
    function editShow4(e){
        e.preventDefault();
        editACVisibility(()=>{
            return "hidden";
        })
    }

    function editName(e){
        e.preventDefault();
        editBoardName(()=>{
            var newName = document.getElementById('new-board-name').value;
            return newName;
        })
        editShow2(e);
    }

    function addCollab(e){
        e.preventDefault();
        addCollaborator(()=>{
            var newCollaborator = document.getElementById('new-collaborator').value;
            return newCollaborator;
        })
        var permission;
        if(document.getElementById('Administrator').checked){
            permission = "Administrator";
        }
        else if(document.getElementById('User').checked){
            permission = "User";
        }
        else{
            permission = "Viewer";
        }
        var div = document.getElementById("dialog-place");
        var dialog = document.createElement("dialog");
        dialog.style.position = "absolute";
        dialog.style.marginLeft = "60vw";
        dialog.style.borderStyle = "none";
        dialog.style.boxShadow="5px 8px 16px 5px gray";
        dialog.style.textAlign="center";
        dialog.style.padding="20px";
        dialog.textContent = `User ${document.getElementById('new-collaborator').value} invited as ${permission}!   `;
        dialog.open = true;
        var ok = document.createElement("button");
        ok.textContent = "OK";
        ok.style.marginLeft="auto";
        ok.style.marginRight="auto";
        ok.style.padding="10px";
        ok.style.backgroundColor = "bisque";
        dialog.appendChild(ok);
        div.appendChild(dialog);
        ok.onclick = function(){
            dialog.close();
        };
        editACVisibility(()=>{return "hidden"});
    }



    return(
        <div>
        <div className={"row"}>
            <button id = "back-to-profile-btn">
                <Link to="/profile">Back to profile</Link>
            </button>
            <p className={"page-header"}>{boardName}</p>
            <button class = "edit-board-btn">...
            <div class="dropdown-edit-board">
                <a onClick={editShow1}>Edit board name</a>
                <a onClick={editShow3}>Invite collaborator</a>
                <a href="#">Export to PDF</a>
                <a href="#" style={{color: "darkred"}}>Delete board</a>
            </div>
            </button>
            
        </div>
        <div className="edit-name-window" style={{visibility: `${showEditBoardName}`}}>
            <button style={{position: "absolute", marginLeft: "230px"}} onClick={editShow2}>X</button>
            <h3>Enter new board name:</h3>
            <input type="text" className="new-name" id="new-board-name" name="text"/>
            <input type="submit" name="submit" onClick={editName} value="Confirm"/>
        </div>
        <div className="edit-name-window" style={{visibility: `${showAddCollaborator}`}}>
            <button style={{position: "absolute", marginLeft: "230px"}} onClick={editShow4}>X</button>
            <h3>Enter username:</h3>
            <input type="text" className="new-name" id="new-collaborator" name="text"/>
            <h3>Permission type:</h3>
            <div>
                <input type="radio" id="Administrator" name="permission" value="Administrator"/>
                <label className="permission-label" for="Administrator">Administrator</label>
            </div>
            <div>
                <input type="radio" id="User" name="permission" value="User"/>
                <label className="permission-label" for="User">User</label>
            </div>
            <div>
                <input type="radio" id="Viewer" name="permission" value="Viewer"/>
                <label className="permission-label" for="Viewer">Viewer</label>
            </div>
            <input id="collab-submit" type="submit" name="submit" onClick={addCollab} value="Confirm"/>
        </div>
        <div id="dialog-place"></div>
    </div>
    )
}


export default Header;