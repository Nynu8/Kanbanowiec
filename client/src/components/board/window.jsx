import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const Window=({show, status, onClose, item, color, deleteItem})=>{
    return(
        <Modal isOpen={show} onRequestClose={onClose} className={"modal"} overlayClassName={"overlay"} >
            <div className={"close-btn-ctn"}>
                <h1 id="title-field" style={{flex: "1 90%"}} contentEditable="true">{item.name}</h1>
                <button className="closes-btn" onClick={onClose}>X</button>
            </div>
            <div>
            <div id={"window-color-bar"} style={{backgroundColor: `${color}`}}> fffffff</div> 
                <h2>Description</h2>
                <p id="description-field" contentEditable="true" placeholder="Add description">{item.description}</p>
                <h2>Status</h2>
                <p>{`${color}  ${status}`}</p>
                <h4>Author</h4>
                <p>task's author</p>
                <h4>Executor</h4>
                <p>task's executor</p>
                <button id="delete-task-btn" onClick={deleteItem}>Delete task</button>
            </div>
        </Modal>
    );
};


export default Window;