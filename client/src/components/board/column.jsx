import React, { useState } from "react";
import editColumnWindow from "./editColumnWindow";
import {statuses} from "../../data/index";


const Column = ({isOver, children, status}) =>{
    const title = useState(status.name);
    const color = useState(status.color);
    const icon = useState(status.color);
    const index = useState(status.index);
    const id = useState(status.id);
    const className = isOver ? " highlight-region" : "";
    
    return (
        <div className={`column${className}`}>
            
            {children}
            
        </div>
    );
};


export default Column;