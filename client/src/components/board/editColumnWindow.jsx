import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const editColumnWindow=({show, onClose, column})=>{
    return(
        <Modal isOpen={show} onRequestClose={onClose} className={"modal"} overlayClassName={"overlay"} >
            <div className={"close-btn-ctn"}>
                <h1 id="title-field" style={{flex: "1 90%"}} contentEditable="true">{column.status}</h1>
                <button className="closes-btn" onClick={onClose}>X</button>
            </div>
                <h2>Color</h2>
                <div className="radio-column">
                <div>
                    <input type="radio" id="red" ClassName="col-color"
                    checked/>
                    <label for="red">"🔴"</label>
                </div>

                <div>
                    <input type="radio" id="orange" ClassName="col-color"/>
                    <label for="orange">"🟠"</label>
                </div>

                <div>
                    <input type="radio" id="yellow" ClassName="col-color"/>
                    <label for="yellow">"🟡"</label>
                </div>
                </div>
                <div className="radio-column">
                <div>
                    <input type="radio" id="green" ClassName="col-color"/>
                    <label for="green">"🟢"</label>
                </div>

                <div>
                    <input type="radio" id="blue" ClassName="col-color"/>
                    <label for="blue">"🔵"</label>
                </div>

                <div>
                    <input type="radio" id="violet" ClassName="col-color"/>
                    <label for="violet">"🟣"</label>
                </div>
                </div>
                <div className="radio-column">
                <div>
                    <input type="radio" id="brown" ClassName="col-color"/>
                    <label for="brown">"🟤"</label>
                </div>

                <div>
                    <input type="radio" id="black" ClassName="col-color"/>
                    <label for="black">"⚫️"</label>
                </div>
                <div>
                    <input type="radio" id="white" ClassName="col-color"/>
                    <label for="white">"⚪️"</label>
                </div>
                </div>
            
        </Modal>
    );
};


export default editColumnWindow;