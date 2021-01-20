import React from "react";
import {useDrop} from "react-dnd";
import {statuses} from "../../data";
import Item from "./item"
import ITEM_TYPE from "../../data/types"

const DropWrapper = ({onDrop, children, id})=>{
    const [{ isOver }, drop] = useDrop({
        accept: ITEM_TYPE,
        canDrop: (item, monitor)=>{
            const itemIndex = statuses.findIndex(si=>si.id===item.columnId);
            const statusIndex = statuses.findIndex(si=>si.id===id);
            return [itemIndex + 1, itemIndex - 1, itemIndex].includes(statusIndex);
        },
        drop: (item, monitor)=>{
            onDrop(item, monitor, id);
        },
        collect: monitor=>({
            isOver: monitor.isOver()
        })
    });

    
    return(
        <div ref={drop} className={"drop-wrapper"}>
            {React.cloneElement(children, { isOver })}
        </div>
    );

};

export default DropWrapper;