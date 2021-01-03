import React, {useState} from "react";
import Header from "../components/board/header";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import Item from "../components/board/item";
import DropWrapper from "../components/board/dropWrapper";
import Column from "../components/board/column";
import {data, statuses} from "../data/index";
import "../assets/styles/board.css";


const BoardPage = () => {

    const [items, setItems] = useState(data);

    const onDrop = (item, monitor, status)=>{
        const mapping = statuses.find(si=>si.status===status);

        setItems(prevState=>{
            const newItems = prevState
            .filter(i=>i.id !== item.id)
            .concat({...item, status, icon: mapping.icon});
            return [...newItems];
        });
    };

    const moveItem = (dragIndex, hoverIndex)=>{
        const item = items[dragIndex];
        setItems(prevState=>{
            const newItems = prevState.filter((i,indx)=>indx!==dragIndex);
            newItems.splice(hoverIndex, 0, item);
            return [...newItems];
        });
    };

    return(
        <div>
            <DndProvider backend={HTML5Backend}>
            <Header/> 
            <div className={"row"}>
            {statuses.map(s=>{
                return (
                    <div key={s.status} className={"col-wrapper"}>
                        <h2 className={"col-header"}>{s.status.toUpperCase()}  {s.icon}</h2>
                        <DropWrapper onDrop={onDrop} status={s.status}>
                            <Column>
                                {items
                                    .filter(i => i.status === s.status)
                                    .map((i, indx) => <Item key={i.id} item={i} index={indx} moveItem={moveItem} status={s} />)
                                }
                            </Column>
                        </DropWrapper>
                    </div>
                );
            })}
            </div>

            </DndProvider>
        </div>
    );
};

export default BoardPage;

