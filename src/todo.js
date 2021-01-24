

const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDo = document.querySelector(".js-toDoList"),
  toDoList = toDo.querySelector("input"); 

const TODOS_LS = "WORKLIST";
 
let toDos = [];

function deleteToDoInList(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDo.removeChild(li);
  return parseInt(li.id); 
}

function deleteToDo(event) {
  let liID = deleteToDoInList(event);
  const cleanToDos = toDos.filter(function(toDo) {
    return toDo.id !== liID;
  });
  toDos = cleanToDos;
  saveToDos();
}

  
  
function getID (event) {
  const btn = event.target;
  const li = btn.parentNode;
  return parseInt(li.id); 
}

function getText ( liId , lsName ) {
  let listText = ""
  const loadedLists = localStorage.getItem(lsName);
  const parsedLists = JSON.parse(loadedLists);
  parsedLists.some(function(lists) {
    if ( lists.id === liId ) {
      listText = lists.text; 
      return true;
    }
  });  

  return listText; 
}


function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo( liId , text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  let newId = liId === 0 ? Date.now() : liId ;

  delBtn.innerText = "❌";
  delBtn.className = "delButton"; 
  delBtn.addEventListener("click", deleteToDo);
  span.innerText = text;
  li.appendChild(delBtn);
  li.appendChild(span);
  li.id = newId;
  toDo.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId
  };
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  if ( currentValue !== '') {
    paintToDo( 0, currentValue);
    toDoInput.value = "";
  }
}


function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function(toDo) {
      paintToDo(toDo.id , toDo.text);
    });
  }
}
    
function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();