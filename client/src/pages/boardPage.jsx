import React, {useState} from "react";
import Header from "../components/board/header";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import Item from "../components/board/item";
import DropWrapper from "../components/board/dropWrapper";
import Column from "../components/board/column";
import {data, statuses as stats} from "../data/index";
import "../assets/styles/board.css";
import { App } from "../app/App";
import { Navbar } from "../components/navbar";


const BoardPage = () => {

    var colmnWindows = Array.prototype.fill("hidden",0,stats.length-1)

    const [items, setItems] = useState(data);
    const [statuses, setStatuses] = useState(stats);
    const [showColumnNameWindow, setColumnNameWindowVisibility] = useState(colmnWindows);


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

    function editColumnIcon(s,e){

        const editedColumnId = statuses.findIndex(si=>si.status===s.status);
        
            e.preventDefault();
            console.log("Funkcja wywolana");
            var iconsCollection = ["🔴","🟠","🟡","🟢","🔵","🟣","⚫️","⚪️","🟤"];
            var colorsCollection = ["red","orange","yellow","green","blue","purple","black","white","brown"];

            var index = iconsCollection.findIndex(si=>si===s.icon)
        
            if(index<iconsCollection.length-1){
                index++;
            }
            else{
                index=0;
            }
            s.icon = iconsCollection[index];
            s.color = colorsCollection[index];
            statuses[editedColumnId].color = s.color;
            statuses[editedColumnId].icon = s.icon;

            
            setStatuses(prevState=>{
                const newStatuses = statuses;
                return[...newStatuses];
            });

    };


    function setColumnNameWindowVisible(s,e){
        e.preventDefault();
        const editedColumnId = statuses.findIndex(si=>si.status===s.status);
        var tmp = showColumnNameWindow;
        tmp[editedColumnId] = "visible";
        setColumnNameWindowVisibility(()=>{
            return [...tmp];
        })
    }
    function setColumnNameWindowHidden(e){
        e.preventDefault();
        setColumnNameWindowVisibility(()=>{
            return "hidden";
        })
    }

    function editColumnTitle(s,e){
        
        e.preventDefault();

        const editedColumnId = statuses.findIndex(si=>si===s);
        s.status = "chujsko"
        statuses[editedColumnId].status = s.status;
        
        setStatuses(()=>{
            const newStatuses = statuses;
            return [...newStatuses];
        })

        console.log("Tytul zmieniony koń zwalony");

    }



    return(
        <div>
            <DndProvider backend={HTML5Backend}>
            <Header/> 
            <div className={"row"}>

            {statuses.map(s=>{
                return (
                    
                    <div key={s.status} className={"col-wrapper"}>
                        <div className="edit-col-name-window" style={{visibility: `hidden`}}>
                                    <button style={{position: "absolute", marginLeft: "230px"}} onClick={setColumnNameWindowHidden}>X</button>
                                    <h3>Enter new column name:</h3>
                                    <input type="text" className="new-name" id="new-column-name" name="text"/>
                                    <input type="submit" name="submit" onClick={(e)=>editColumnTitle(s,e)} value="Confirm"/>
                                </div>
                        <div className="col-header-div">
                        <button className="col-icon-button" onClick={(e)=>editColumnIcon(s,e)}>{s.icon}</button>
                            <div className={"col-header"} onBlur={(e)=>editColumnTitle(s,e)} >{s.status.toUpperCase()}</div>
                            <button className="edit-col-button">...
                            <div class="dropdown-edit-column">
                                <a onClick={(e)=>setColumnNameWindowVisible(s,e)}>Edit column name</a>
                                <a href="#">Change position</a>
                                <a href="#" style={{color: "darkred"}}>Delete column</a>
                            </div>
                        </button>
                        
                        </div>
                       
                        <DropWrapper onDrop={onDrop} status={s.status}>
                            
                            <Column status={s}>
                                
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

