import React, { useState } from "react";
import editColumnWindow from "./editColumnWindow";
import {statuses} from "../../data/index";


const Column = ({isOver, children, status}) =>{
    const title = useState(status.status);
    const color = useState(status.color);
    const icon = useState(status.icon);
    const className = isOver ? " highlight-region" : "";
    
    return (
        <div className={`column${className}`}>
            
            {children}
            <button id="add-item-btn">ADD TASK</button>
        </div>
    );
};


export default Column;