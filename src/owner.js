const ownerContainer = document.querySelector(".js-owner"),
  ownerText = document.getElementById("onwer-name"), 
  changeBtn = document.getElementById("edit-owner"); 

const OWNER_LS = "onwer";  
const OWNER_SHOW_MODE = "show-owner";
const OWNER_EDIT_MODE = "edit-owner";
const BUTTON_TEXT_EDIT = 'edit name'
const BUTTON_TEXT_CANCEL = 'cancel'

let owner = '';


function loadOwner() {
  owner = localStorage.getItem(OWNER_LS);
  if (owner !== null) {
    ownerText.value = `Welcome ${owner}`; 
    ownerText.placeholder = '';
    changeMode(OWNER_SHOW_MODE);  
  }
  else {
    ownerText.placeholder = 'Write Your Name'; 
    changeMode(OWNER_EDIT_MODE) ; 
  }
}

function changeMode( mode ) {
  if ( mode === OWNER_SHOW_MODE ) {
    ownerText.classList.add(OWNER_SHOW_MODE);
    ownerText.classList.remove(OWNER_EDIT_MODE);
    ownerText.disabled =true; 
  }
  else {
    ownerContainer.classList.remove(OWNER_SHOW_MODE);
    ownerContainer.classList.add(OWNER_EDIT_MODE);
    ownerText.disabled = false; 
  }
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = ownerText.value;
  localStorage.setItem(OWNER_LS , currentValue);
  changeMode ( OWNER_SHOW_MODE );
  loadOwner(); 
}

function handleClick(event) {
  changeName ( event.target.value ) ;
}

function changeName ( editMode ) {
  if ( editMode == BUTTON_TEXT_EDIT ) {
    changeMode ( OWNER_EDIT_MODE );
    ownerText.value = owner;
    ownerText.focus();
//    changeBtn.value = BUTTON_TEXT_CANCEL;

  }
  else {
    loadOwner(); 
//    changeBtn.value = BUTTON_TEXT_EDIT;
  }

}


function handleFocusOut(event) {
  changeName(BUTTON_TEXT_CANCEL);
}


function init() {
  loadOwner(); 
  ownerContainer.addEventListener("submit", handleSubmit);
  ownerText.addEventListener("focusout" , handleFocusOut );
  changeBtn.addEventListener("click" , handleClick );
}

init();
