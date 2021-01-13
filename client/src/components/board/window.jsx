import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const Window=({show, onClose, item, color, icon})=>{
    return(
        <Modal isOpen={show} onRequestClose={onClose} className={"modal"} overlayClassName={"overlay"} >
            <div className={"close-btn-ctn"}>
                <h1 id="title-field" style={{flex: "1 90%"}} contentEditable="true">{item.title}</h1>
                <button className="closes-btn" onClick={onClose}>X</button>
            </div>
            <div>
            <div id={"window-color-bar"} style={{backgroundColor: `${color}`}}> fffffff</div> 
                <h2>Description</h2>
                <p id="description-field" contentEditable="true">{item.content}</p>
                <h2>Status</h2>
                <p>{`${icon} ${item.status.charAt(0).toUpperCase()}${item.status.slice(1)}`}</p>
                <button id="delete-task-btn">Delete task</button>
            </div>
        </Modal>
    );
};

export default Window;