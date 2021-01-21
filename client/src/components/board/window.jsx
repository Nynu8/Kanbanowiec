import React, { useState, useEffect, useCallback } from "react";
import Modal from "react-modal";
import httpClient from "../../tools/httpClient"

Modal.setAppElement("#root");

const Window=({show, status, item, color, deleteItem, boardID, onClose, workersList})=>{

    var [worker, setWorker] = useState("");
    var [creator, setCreator] = useState("");
    var [loading, setLoading] = useState(false);
    var [showWindow, setShow] = useState(show);
    var [workerName, setWorkerName] = useState("");

    useEffect(() => {
        loadWindowData();
      }, [loading]);
      
    const loadWindowData = useCallback(() => {
        if (!loading) setLoading(true);

        async function getCreatorAndWorker(){
            try{
                var worker = await httpClient.getUserDetails({
                    userId: item.workerId
                });
                var creator = await httpClient.getUserDetails({
                    userId: item.creatorId
                });
                setWorker(worker);
                setWorkerName(worker.username);
                setCreator(creator);

            }
            catch(err){
                console.log(err.message);
            }
        }
        getCreatorAndWorker();
        setLoading(false);
  }, [loading]);

    async function saveChanges(){
        var name = document.getElementById("title-field").textContent;
        var description = document.getElementById("description-field").textContent;
        try{
            console.log(name, description, worker.id, worker.username, boardID, item.id)
            console.log(workersList)
            await httpClient.editTask({
                //workerId: worker.id,
                name: name,
                description: description,
                boardId: boardID,
                taskId: item.id
            })
            setShow(false);
            //document.getElementById("item-window").style.visibility="hidden";
            //document.getElementById('#item-window').modal('hide');
            document.getElementById('#item-window').modal.isOpen = showWindow;
            setLoading(true);
        }
        catch(err){
            console.error(err.message);
        }
    }

    function changeWorker(e){
        e.preventDefault();
        document.getElementById("workers-list").innerHTML = "";
        for(var i=0; i<workersList.length; i++){
            var option = document.createElement("a");
            option.textContent = workersList[i].username;
            const wlist = workersList;
            option.addEventListener('click', (e)=>{
                e.preventDefault();
                console.log(wlist)
                setWorker(wlist[i]);
                setWorkerName(worker.username);
                document.getElementById("workers-list").innerHTML = "";
                //document.getElementById("worker-button").innerText
                saveChanges();
            })
   
            document.getElementById("workers-list").appendChild(option);
        }
    }
    
    

    return(
        <Modal isOpen={showWindow = show} onRequestClose={saveChanges} className={"modal"} id="item-window" overlayClassName={"overlay"} >
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
                <p>{creator.username}</p>
                <h4>Executor</h4>
                <div id="dropdown-workers">
                    <button onClick={(e)=>changeWorker(e)} id="worker-button" class="dropbtn">{workerName}</button>
                    <div id="workers-list" class="dropdown-content">
                    </div>
                </div>
                <button id="delete-task-btn" onClick={deleteItem}>Delete task</button>
            </div>
        </Modal>
    );
};


export default Window;