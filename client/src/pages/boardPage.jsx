import React, { useState, useEffect, useCallback } from "react";
import Header from "../components/board/header";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Item from "../components/board/item";
import DropWrapper from "../components/board/dropWrapper";
import Column from "../components/board/column";
import { data, statuses as stats } from "../data/index";
import "../assets/styles/board.css";
import { App } from "../app/App";
import { Navbar } from "../components/navbar";
import { Link, useParams } from "react-router";
import httpClient from "../tools/httpClient";

export const ref = React.createRef();

var columnNameWindows = [10];
var columnIndexWindows = [10];
for (var i = 0; i < 10; i++) {
  columnNameWindows[i] = "hidden";
  columnIndexWindows[i] = "hidden";
}

const BoardPage = (props) => {
  const [items, setItems] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [showColumnNameWindow, setColumnNameWindowVisibility] = useState(
    columnNameWindows
  );
  const [showColumnIndexWindow, setColumnIndexWindowVisibility] = useState(
    columnIndexWindows
  );
  const boardID = useParams(props.match.params.id);
  const [boardData, setBoardData] = useState();
  const [boardName, setBoardName] = useState("");
  const [collaborators, setCollaborators] = useState([]);

  const [loading, setLoading] = useState(false);
  var [name, setName] = useState("");
  var [userName, setUserName] = useState("");
  var [userId, setUserId] = useState("");
  console.log(boardID);

  useEffect(() => {
    loadBoardData();
  }, [loading]);

  const loadBoardData = useCallback(() => {
    if (!loading) setLoading(true);
    async function loadBoard() {
      try {
        var data = await httpClient.getBoard({
          boardId: boardID.id,
        });
        setBoardData(data);
        setBoardName(data.board.name);
        setCollaborators(data.collaborators);
        setItems(data.tasks);
        setStatuses(data.columns);

        var user = await httpClient.getUserDetails();
        setName(user.name);
        setUserName(user.username)
        var userTmpID = data.collaborators.find((c)=>c.username == user.username).id
        setUserId(userTmpID);

        for (var i = 0; i < statuses.length; i++) {
            columnNameWindows[i] = "hidden";
            columnIndexWindows[i] = "hidden";
          }

        setLoading(false);
      } catch (err) {
        console.error(err.message);
        setLoading(false);
      }
    }

    loadBoard();
    setLoading(false);
  }, [loading]);

  const onDrop = async (item, monitor, columnId) => {
    const mapping = statuses.find((si) => si.id == columnId);

    try{
        await httpClient.changeTaskColumn({
            columnId: columnId,
            taskId: item.id
        });
        console.log(boardData.collaborators)
        setLoading(true);
    }
    catch(err){
        console.error(err.message);
    }
  };

  const moveItem = (dragIndex, hoverIndex) => {
    const item = items[dragIndex];
    setItems((prevState) => {
      const newItems = prevState.filter((i, indx) => indx !== dragIndex);
      newItems.splice(hoverIndex, 0, item);
      return [...newItems];
    });
  };

  async function editColumnIcon(s) {
    const ColumnColor = {
      Red: "Red",
      Orange: "Orange",
      Yellow: "Yellow",
      Green: "Green",
      Blue: "Blue",
      Purple: "Purple",
      Black: "Black",
      White: "White"
    };

    var currentColor = s.color;
    switch(s.color){
        case "Red":
            currentColor = ColumnColor.Orange;
            break;
            case "Orange":
            currentColor = ColumnColor.Yellow;
            break;
            case "Yellow":
            currentColor = ColumnColor.Green;
            break;
            case "Green":
            currentColor = ColumnColor.Blue;
            break;
            case "Blue":
            currentColor = ColumnColor.Purple;
            break;
            case "Purple":
            currentColor = ColumnColor.White;
            break;
            case "White":
            currentColor = ColumnColor.Black;
            break;
            case "Black":
            currentColor = ColumnColor.Red;
            break;
    }
    

    try {
      await httpClient.editColumn({
        columnId: s.id,
        newName: s.name,
        color: currentColor
    });
        
    } catch (err) {
      console.error(err.message);
    }

    setLoading(true);
  }
  function ActualCurrentColor(s)
  {
    switch(s){
      case "Red":    return "crimson"; break;
      case "Orange": return "coral"; break;
      case "Yellow": return "gold"; break;
      case "Green":  return "seagreen"; break;
      case "Blue":   return "royalblue"; break;
      case "Purple": return "orchid"; break;
      case "White":  return "white"; break;
      case "Black":  return "black"; break;
    }
  }
  
  function setColumnNameWindowVisible(s, e) {
    e.preventDefault();
    const editedColumnIndex = s.index;
    var tmp = showColumnNameWindow;
    tmp[editedColumnIndex] = "visible";
    setColumnNameWindowVisibility(() => {
      return [...tmp];
    });
  }
  function setColumnNameWindowHidden(s, e) {
    e.preventDefault();
    const editedColumnIndex = s.index;
    var tmp = showColumnNameWindow;
    tmp[editedColumnIndex] = "hidden";
    setColumnNameWindowVisibility(() => {
      return [...tmp];
    });
  }

  async function editColumnTitle(s, e) {
    e.preventDefault();

    var newName = document.getElementsByClassName("new-column-name")[s.index]
      .value;
    var prevStatus = s.name;
    //s.name = newName;
    //statuses[editedColumnId].name = s.name;
    console.log(s.id);
    console.log(s.index);
    console.log(newName);
    console.log(s.color);

    await httpClient.editColumn({
      columnId: s.id,
      newName: newName,
      color: s.color,
    });

    setLoading(true);

    setColumnNameWindowHidden(s, e);
  }

  function setColumnIndexWindowVisible(s, e) {
    e.preventDefault();
    const editedColumnIndex = s.index;
    var tmp = showColumnIndexWindow;
    tmp[editedColumnIndex] = "visible";
    setColumnIndexWindowVisibility(() => {
      return [...tmp];
    });
  }

  function setColumnIndexWindowHidden(s, e) {
    e.preventDefault();
    const editedColumnIndex = s.index;
    var tmp = showColumnNameWindow;
    tmp[editedColumnIndex] = "hidden";
    setColumnIndexWindowVisibility(() => {
      return [...tmp];
    });
  }

  async function changeColumnPosition(s, e) {
    e.preventDefault();

    const editedColumnIndex = s.index;
    const selectedIndex = document.getElementsByClassName("new-column-index")[editedColumnIndex].value;

    console.log(editedColumnIndex)
    console.log(selectedIndex)
    try{
        
        await httpClient.editColumn({
            columnId: s.id,
            newName: s.name,
            color: s.color,
            index: selectedIndex
        })
        setLoading(true);
    }
    catch(err){
        console.error(err.message);
    }

    setColumnIndexWindowHidden(s, e);
  }

  function columnSwap(s, direction) {
    if (direction === "right") {
      var tmp = statuses[statuses.indexOf(s) + 1];
      statuses[statuses.indexOf(s) + 1] = s;
      statuses[statuses.indexOf(s)] = tmp;
    } else {
      var tmp = statuses[statuses.indexOf(s) - 1];
      statuses[statuses.indexOf(s) - 1] = s;
      statuses[statuses.indexOf(s)] = tmp;
    }
    setStatuses(() => {
      const newStatuses = statuses;
      return [...newStatuses];
    });
  }

  function updateIndexInput(s,e) {
      e.preventDefault();
      console.log(s.index)
    var indexValue = document.getElementsByClassName("new-column-index")[s.index].value;
    document.getElementsByClassName("index-label")[s.index].textContent = indexValue;
  }

  async function addItem(s, e) {
    e.preventDefault();
    console.log(userId, userName)
    try{
    await httpClient.addTask({
      name: "New task",
      description: "Add description",
      columnId: s.id
    });
    setLoading(true);
}
catch(err){
    console.error(err.message)
}
    
  }

  function deleteItem(itemId, item, e) {
    e.preventDefault();
    var div = document.getElementById("dialog-place");
    var dialog = document.createElement("dialog");
    dialog.id = "dialog-window";

    dialog.textContent = `Are you sure you want to delete this item?`;
    dialog.open = true;
    dialog.style.zIndex = 2;
    dialog.style.width = "170px";
    var yes = document.createElement("button");
    yes.className = "dialog-button";
    yes.textContent = "Yes";

    var no = document.createElement("button");
    no.className = "dialog-button";
    no.textContent = "No";

    dialog.appendChild(yes);
    dialog.appendChild(no);
    div.appendChild(dialog);

    no.onclick = function () {
      dialog.close();
      console.log(item.userId)
      console.log(item.id)
    };
    yes.onclick = async function () {
      dialog.close();

      await httpClient.deleteTask({
        taskId: itemId,
        boardId: boardID.id,
      });
      setLoading(true);
    };
  }

  function deleteColumn(s, e) {
    e.preventDefault();

    var div = document.getElementById("dialog-place");
    var dialog = document.createElement("dialog");
    dialog.id = "dialog-window";

    dialog.textContent = `Are you sure you want to delete column ${s.name.toUpperCase()}?`;
    dialog.open = true;
    var yes = document.createElement("button");
    yes.className = "dialog-button";
    yes.textContent = "Yes";

    var no = document.createElement("button");
    no.className = "dialog-button";
    no.textContent = "No";

    dialog.appendChild(yes);
    dialog.appendChild(no);
    div.appendChild(dialog);

    no.onclick = function () {
      dialog.close();
    };
    yes.onclick = async function () {
      dialog.close();
      try{
      await httpClient.deleteColumn({
        columnId: s.id
      });
      setLoading(true);
    }
    catch(err){
      console.error(err.message)
    }
  }
}

function BoardClick(s, e)
{
  e.preventDefault();
  var columns = document.getElementsByClassName("col-wrapper")
  var dropwraps = document.getElementsByClassName("drop-wrapper")
  
  if(window.innerWidth < window.innerHeight){
  for (let i = 0; i < columns.length; i++)
  {
    if (i != s.index || dropwraps[i].style.display == "flex")  
      dropwraps[i].style.display = "none";
    else  
      dropwraps[i].style.display = "flex";
  }
}
}

  function addColumn(e) {
    e.preventDefault();

    var div = document.getElementById("dialog-place");
    var dialog = document.createElement("dialog");
    dialog.id = "dialog-window";
    var p = document.createElement("h4");
    var input = document.createElement("input");
    var ok = document.createElement("button");
    var x = document.createElement("button");
    p.innerText = "New column's name:";
    input.type = "text";
    ok.textContent = "OK";
    x.textContent = "x";
    x.style.fontSize = "large";
    x.style.position = "absolute";
    x.style.marginTop = "-70px";
    dialog.open = true;
    dialog.className = "edit-col-name-window";
    dialog.style.width = "180px";
    dialog.style.marginLeft = "20px";
    dialog.appendChild(p);
    dialog.appendChild(input);
    dialog.appendChild(x);
    dialog.appendChild(ok);
    div.appendChild(dialog);

    ok.onclick = async function () {
      try {
        await httpClient.addColumn({
          index: statuses.length,
          name: input.value,
          boardId: boardID.id,
        });
        setLoading(true);
      } catch (err) {
        console.error(err.message);
      }
      dialog.close();
    };
    x.onclick = function () {
      dialog.close();
    };
  }


  return (
    <div>
      <Navbar name={name} />
      <DndProvider backend={HTML5Backend}>
        <Header name={boardName} boardID={boardID.id} />
        <button id="add-col-btn" onClick={(e) => addColumn(e)}>
          +
        </button>
        <div id="dialog-place"></div>
        <div className={"row"} ref={ref}>
          {statuses
            .sort((a, b) => a.index - b.index)
            .map((s) => {
              return (
                <div key={s.index} className={"col-wrapper"}>
                  <div
                    className="edit-col-name-window"
                    style={{ visibility: `${showColumnNameWindow[s.index]}` }}
                  >
                    <button
                      style={{ position: "absolute", marginLeft: "230px" }}
                      onClick={(e) => setColumnNameWindowHidden(s, e)}
                    >
                      &#10005;
                    </button>
                    <h3>Enter new column name:</h3>
                    <input
                      type="text"
                      className="new-name"
                      class="new-column-name"
                      name="text"
                    />
                    <input
                      id="submit-btn-name"
                      type="submit"
                      name="submit"
                      onClick={(e) => editColumnTitle(s, e)}
                      value="Confirm"
                    />
                  </div>
                  <div
                    className="edit-col-name-window"
                    style={{ visibility: `${showColumnIndexWindow[s.index]}` }}
                  >
                    <button
                      style={{ position: "absolute", marginLeft: "230px" }}
                      onClick={(e) => setColumnIndexWindowHidden(s, e)}
                    >
                      &#10005;
                    </button>
                    <h3>Enter new column index:</h3>
                    <input
                      type="range"
                      className="new-column-index"
                      id="index"
                      min={0}
                      max={statuses.length-1}
                      name="index"
                      onChange={(e) => updateIndexInput(s, e)}
                    />
                    <label className="index-label" for="index"></label>
                    <input
                      id="submit-btn-index"
                      type="submit"
                      name="submit"
                      className="submit-button"
                      onClick={(e) => changeColumnPosition(s, e)}
                      value="Confirm"
                    />
                  </div>
                  <div className="col-header-div" onClick={(e)=>BoardClick(s, e)}>
                    <button
                      className="col-icon-button"
                      onClick={(e) => editColumnIcon(s, e)}
                    >
                      <div className="icon-div" style={{backgroundColor: `${ActualCurrentColor(s.color)}`}}></div>
                    </button>
                    <div
                      className={"col-header"}
                      onBlur={(e) => editColumnTitle(s, e)}
                    >
                      {s.name}
                    </div>
                    <button className="edit-col-button">
                      &#9776;
                      <div className="dropdown-edit-column">
                        <a onClick={(e) => setColumnNameWindowVisible(s, e)}>
                          Edit name
                        </a>
                        <a onClick={(e) => setColumnIndexWindowVisible(s, e)}>
                          Change position
                        </a>
                        <a id="dropdown-edit-delete"
                          onClick={(e) => deleteColumn(s, e)}
                        >
                          &#10005; Delete column
                        </a>
                      </div>
                    </button>
                  </div>
                  <DropWrapper onDrop={onDrop} id={s.id} className="drop-wrapper">
                    <Column status={s}>
                      {items
                        .filter((i) => i.columnId === s.id)
                        .map((i, indx) => (
                          <Item
                            key={i.id}
                            item={i}
                            index={indx}
                            moveItem={moveItem}
                            deleteItem={(e) => deleteItem(i.id, i, e)}
                            status={s}
                            boardID={boardID.id}
                            workersList={collaborators}
                            worker={i.worker}
                            barColor={ActualCurrentColor(s.color)}
                          />
                        ))}
                      <button id="add-item-btn" onClick={(e) => addItem(s, e)}>
                        ADD ITEM
                      </button>
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
