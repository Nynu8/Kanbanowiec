import React, { Fragment, useRef, useState } from "react";
import {useDrag, useDrop} from "react-dnd";
import { Any } from "typeorm";
import Window from "./window";
import ITEM_TYPE from "../../data/types"
import { data } from "../../data";
import httpClient from "../../tools/httpClient"

const Item = ({item, index, moveItem, status, deleteItem, editItemWindowClose, boardID, workersList}) =>{

    const ref = useRef(null);
    

    const [, drop] = useDrop({                                                  //drag&drop logic
        accept: ITEM_TYPE,
        hover(item, monitor){
            if(!ref.current){
                return;
            }

            const dragIndex = item.index;
            const hoverIndex = index;

            if(dragIndex === hoverIndex){                                       //if item is dropped in the same place nothing happens
                return;
            }

            const hoveredRect = ref.current.getBoundingClientRect();
            const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top)/2;
            const mousePosition = monitor.getClientOffset();
            const hoverClientY = mousePosition.y - hoveredRect.top;

            if(dragIndex < hoverIndex && hoverClientY < hoverMiddleY){          //if the mouse position is less than the next item's middle point position from the top nothing happens
               return;
            }
            if(dragIndex > hoverIndex && hoverClientY > hoverMiddleY){          //if the mouse position is more than the previous item's middle point position from the top nothing happens
               return;
            }

            moveItem(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });

    const [{ isDragging }, drag] = useDrag({
        item: {type: ITEM_TYPE, ...item, index},
        collect: monitor=>({
            isDragging: monitor.isDragging()
        })
    });

    const [show, setShow] = useState(false);

    const onOpen = () => setShow(true);

    const onClose = async () => {
        var titleField = document.querySelector("#title-field");
        var descriptionField = document.querySelector("#description-field")
        item.name = titleField.textContent;
        item.description = descriptionField.textContent;
        setShow(false);
        try{
            console.log(item.name, item.description, boardID, item.id, workersList[0].id)
        await httpClient.editTask({
            workerId: workersList[0].id,
            name: item.name,
            description: item.description,
            boardId: boardID,
            taskId: item.id
        });
        }
        catch(err){
            console.error(err.message);
        }
    }
    


    drag(drop(ref));

    return(
        <Fragment>
            <div ref={ref} style={{ opacity: isDragging? 0 : 1}} className={"item"} onClick={onOpen}>
                <div className={"color-bar"} style={{ backgroundColor: status.color}} />  
                <p className={"item-title"}>{item.name}</p>
                <p className={"item-status"}>{status.color}</p>
            </div>
            <Window onClose={onClose} id="pop-up-window" item={item} deleteItem={deleteItem} show={show} color={status.color} status={status.name} boardID={boardID} workersList={workersList} icon={status.color}/>
        </Fragment>
    );
};

export default Item;