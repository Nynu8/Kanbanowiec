import React, { useState, useEffect, useCallback } from "react";
import Modal from "react-modal";
import httpClient from "../../tools/httpClient"

Modal.setAppElement("#root");

const Window=({show, status, item,  color, deleteItem, boardID, worker, onClose, workersList, barColor})=>{

    var [worker, setWorker] = useState(worker);
    var [creator, setCreator] = useState("");
    var [loading, setLoading] = useState(false);
    var [showWindow, setShow] = useState(show);
    var [workerId, setWorkerId] = useState();

    useEffect(() => {
        loadWindowData();
      }, [loading]);
      
    const loadWindowData = useCallback(() => {
        if (!loading) setLoading(true);

        async function getCreatorAndWorker(){
            try{
                console.log(item.worker);
                if(worker!==undefined){
                
                setWorker(worker);
                
                console.log(worker);
            }
            else{
                setWorker("Not assigned");
                //setWorkerName("Not assigned");
            }
                console.log(worker)
            }
            catch(err){
                console.log(err.message);
            }
        }
        getCreatorAndWorker();
        setLoading(false);
  }, [loading]);

    async function saveChanges(){
        console.log("SAVE CHANGES ODPALONE")
        var name = document.getElementById("title-field").textContent;
        var description = document.getElementById("description-field").textContent;
        try{
            console.log(name, description, workerId, worker, boardID, item.id)
            console.log(workersList)
            await httpClient.editTask({
                workerId: workerId,
                name: name,
                description: description,
                boardId: boardID,
                taskId: item.id
            })
            onClose();
        }
        catch(err){
            console.error(err.message);
        }
    }

    function changeWorker(e){
        e.preventDefault();
        document.getElementById("workers-list").innerHTML = "";
        for(const workerItem of workersList){
            var option = document.createElement("a");
            option.textContent = workerItem.username+` (${workerItem.type})`
            option.addEventListener('click', (e)=>{

                e.preventDefault();
                console.log(workersList)
                console.log(workerItem)
                setWorker(workerItem.username);                
                setWorkerId(()=>{
                    var id = workersList.find((w)=>w.username==workerItem.username).id;
                    console.log(id);

                    document.getElementById("worker-button").textContent = workerItem.username;
                    var workerIdSlot = document.createElement("p");
                    workerIdSlot.id = "worker-id";
                    //saveChanges(id)
                    
                    return id;
                });
                
                document.getElementById("worker-button").textContent = workerItem.username;
                var workerIdSlot = document.createElement("p");
                //workerIdSlot.textContent = worker.id;
                workerIdSlot.id = "worker-id";
               // saveChanges();
                //item.workerId = worker.id;
                //setLoading(true);
                
            })
            document.getElementById("workers-list").appendChild(option);
        }
    }
    
    

    return(
        <Modal isOpen={showWindow = show} onRequestClose={saveChanges} className={"modal"} id="item-window" overlayClassName={"overlay"} >
            <div className={"close-btn-ctn"}>
                <h1 id="title-field" style={{flex: "1 90%"}} contentEditable="true">{item.name}</h1>
                <button className="closes-btn" onClick={saveChanges}>&#10005;</button>
            </div>
            <div>
            <div id={"window-color-bar"} style={{backgroundColor: `${barColor}`}}> </div> 
                <h2>Description</h2>
                <p id="description-field" contentEditable="true" placeholder="Add description">{item.description}</p>
                <h2>Status</h2>
                <div id="status-div-dot">
                    <div className="icon-div" id="status-dot" style={{backgroundColor: `${barColor}`}}></div>
                    <div id="status-div">{`${status}`}</div>
                </div>
                <h4>Executor</h4>
                <div id="dropdown-workers">
                    <button onClick={(e)=>changeWorker(e)} id="worker-button" class="dropbtn">{worker}</button>
                    <div id="workers-list" class="dropdown-content">
                    </div>
                </div>
                <button id="delete-task-btn" onClick={deleteItem}>&#10005; Delete task</button>
            </div>
        </Modal>
    );
};


export default Window;