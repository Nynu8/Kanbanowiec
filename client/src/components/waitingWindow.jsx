import React from "react";
import Modal from "react-modal";
import loadingImg from "../assets/images/loading.png"

Modal.setAppElement("#root");

const WaitingWindow=({show})=>{
    return(
        <div style={{visibility: `${show}`}} className={"waiting"}  >
            <img src={loadingImg}/>
            <h2>Please wait</h2>
        </div>
    );
};


export default WaitingWindow;