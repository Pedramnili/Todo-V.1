// Selectors
let list_Array = [] , num = 0 , conterAction = 0;


// Events
document.getElementById("btn-form").addEventListener("click", sumbitAddToDo);

document.addEventListener("DOMContentLoaded", function() {
  if(localStorage.getItem("number_of_actions")) {
    conterAction = JSON.parse(localStorage.getItem("number_of_actions"));
  } else {
    localStorage.setItem("number_of_actions", JSON.stringify(conterAction));
  }
});

document.addEventListener("DOMContentLoaded", function() {
  if(localStorage.getItem("List_To_Do")) {
      list_Array = JSON.parse(localStorage.getItem("List_To_Do"));
      addItemToList(list_Array);
  } else {
      localStorage.setItem("List_To_Do", JSON.stringify(list_Array));
  }
});


// Functions
function sumbitAddToDo(event) {
  event.preventDefault();
  addToDo();
}

function addToDo() {
  if (num === 0 && list_Array.length !== 0) {
    num = Math.max(...(list_Array.map((e) => {return e.id;}))) + 1
  }
  if (document.getElementById("input-form").value.trim() !== "") {
    document.querySelector("#my-list").insertAdjacentHTML("beforeend",
    `<li class="todo" id="li-${num}">
      <div class=icons>
        <input type="checkbox" id="check-${num}" onchange="checkedItem(id.substr(6));">
        <span>${document.getElementById("input-form").value.trim()}</span>
      </div>
      <div class="icon-edit">
        <span class="iconify" id="pen-${num}" data-icon="fa-solid:pen" 
        onclick="editToDo(id.substr(4))"></span>
        <span class="iconify" id="bin-${num}" data-icon="ion:trash-bin" 
        onclick="deleteToDo(id.substr(4))"></span>
      </div>
    </li>`);
    list_Array.unshift({id: num++,list: document.getElementById("input-form").value.trim(),checked: false}); 
    localStorage.setItem("List_To_Do", JSON.stringify(list_Array)); 
    localStorage.setItem("number_of_actions", ++conterAction); 
    document.getElementById("error").style.display = "none";
  } else { 
    document.getElementById("error").style.display = "block"; }
}

function editToDo(id) {
  document.getElementById("form-todo").innerHTML = `
  <input id="input-form" type="text" value="${document.getElementById(`li-${id}`).innerText}" 
  autocomplete="off">
  <span id="edit-${id}" class="iconify btn-form-edit" data-icon="subway:tick" 
  onclick="acceptEdit(id.substr(5));"></span>`;
  for (const key in list_Array) {
    document.getElementById(`bin-${list_Array[key]["id"]}`).style.color ="gray";
    document.getElementById(`bin-${list_Array[key]["id"]}`).removeAttribute("onclick");
  }
  document.getElementById("input-form").focus();
}

function deleteToDo(id) {
  document.getElementById(`li-${id}`).innerHTML = `
  <div class=icons>
  <input type="checkbox" id="check-${id}" onchange="checkedItem(id.substr(6))">
  <span>${document.getElementById(`li-${id}`).innerText}</span></div>
  <div class="icon-delete">
    <span id="tick-${id}" class="iconify btn-form-edit" data-icon="subway:tick" 
    onclick="deleteToDoAcc(id.substr(5))"></span>
    <span id="close-${id}" class="iconify" data-icon="ant-design:close-circle-filled" 
    onclick="deleteToDoClo(id.substr(6))">
    </span>
  </div>`;
  for (const key in list_Array) {
    if (list_Array[key]["id"] != id) {
      document.getElementById("btn-form").disabled = true;
      document.getElementById("btn-form").style.color = "gray";
      document.getElementById(`bin-${list_Array[key]["id"]}`).removeAttribute("onclick");
      document.getElementById(`pen-${list_Array[key]["id"]}`).removeAttribute("onclick");
      document.getElementById(`bin-${list_Array[key]["id"]}`).style.color ="gray";
      document.getElementById(`pen-${list_Array[key]["id"]}`).style.color ="gray";
    }
  }
}

function deleteToDoAcc(id) {
  for (const key in list_Array) {
    if (list_Array[key]["id"] === Number(id)) {
      let pos = list_Array.map(function(e) { return e.id; }).indexOf(Number(id));
      list_Array.splice(pos, 1);
      document.getElementById(`li-${id}`).remove();
      localStorage.setItem("List_To_Do", JSON.stringify(list_Array));
      localStorage.setItem("number_of_actions", ++conterAction); 
    }
  }
  for (const key in list_Array) {
    if (list_Array[key]["id"] != id) {
      document.getElementById("btn-form").disabled = false;
      document.getElementById("btn-form").style.color = "#ec1010";
      document.getElementById(`bin-${list_Array[key]["id"]}`).setAttribute("onclick", 
      "deleteToDo(id.substr(4))");
      document.getElementById(`pen-${list_Array[key]["id"]}`).setAttribute("onclick", 
      "editToDo(id.substr(4))");
      document.getElementById(`bin-${list_Array[key]["id"]}`).style.color ="#e93030cb";
      document.getElementById(`pen-${list_Array[key]["id"]}`).style.color ="#4040e9cb";
    }
  }
}

function deleteToDoClo(id) {
  document.getElementById(`li-${id}`).innerHTML = `
  <div class=icons>
    <input type="checkbox" id="check-${id}" onchange="checkedItem(id.substr(6));">
    <span>${document.getElementById(`li-${id}`).innerText}</span></div>
  <div class="icon-edit">
    <span class="iconify" id="pen-${id}" data-icon="fa-solid:pen" 
    onclick="editToDo(id.substr(4))"></span>
    <span class="iconify" id="bin-${id}" data-icon="ion:trash-bin" 
    onclick="deleteToDo(id.substr(4))">
    </span>
  </div>`;
  for (const key in list_Array) {
    document.getElementById("btn-form").disabled = false;
    document.getElementById("btn-form").style.color = "#ec1010";
    document.getElementById(`bin-${list_Array[key]["id"]}`).setAttribute("onclick", 
    "deleteToDo(id.substr(4))");
    document.getElementById(`pen-${list_Array[key]["id"]}`).setAttribute("onclick", 
    "editToDo(id.substr(4))");
    document.getElementById(`bin-${list_Array[key]["id"]}`).style.color = "#e93030cb";
    document.getElementById(`pen-${list_Array[key]["id"]}`).style.color = "#4040e9cb";
  }
}

function acceptEdit(id) {
  if (document.getElementById("input-form").value.trim() !== "") { 
    let pos = list_Array.map(function(e) { return e.id; }).indexOf(Number(id));
    list_Array[pos]["list"] = document.getElementById("input-form").value;
    localStorage.setItem("List_To_Do", JSON.stringify(list_Array));
    document.getElementById(`li-${id}`).innerHTML = `
    <div class=icons>
      <input type="checkbox" id="check-${id}" onchange="checkedItem(id.substr(6));">
      <span>${document.getElementById("input-form").value.trim()}</span></div>
    <div class="icon-edit">
      <span class="iconify" id="pen-${id}" data-icon="fa-solid:pen" 
      onclick="editToDo(id.substr(4))"></span>
      <span class="iconify" id="bin-${id}" data-icon="ion:trash-bin" 
      onclick="deleteToDo(id.substr(4))"></span>
    </div>`;
    document.getElementById("form-todo").innerHTML = `
    <input id="input-form" type="text" placeholder="Do it Here...." 
      onfocus="this.placeholder=''" onblur="this.placeholder='Do it Here....'" autocomplete="off">
    <button id="btn-form" type="submit"><span class="iconify" data-icon="entypo:pin"></span></button>`;
    document.getElementById("btn-form").addEventListener("click", sumbitAddToDo);
    for (const key in list_Array) {
      document.getElementById(`bin-${list_Array[key]["id"]}`).style.color = "#e03030cb";
      document.getElementById(`bin-${list_Array[key]["id"]}`).setAttribute("onclick", 
      "deleteToDo(id.substr(4))");
    }
    document.getElementById("error").style.display = "none";
    localStorage.setItem("number_of_actions", ++conterAction); 
  } else { document.getElementById("error").style.display = "block";}
}

function checkedItem(id) {
  let pos = list_Array.map(function(e) { return e.id; }).indexOf(Number(id));
  list_Array[pos]["checked"] = document.getElementById(`check-${id}`).checked
  localStorage.setItem("List_To_Do", JSON.stringify(list_Array));
  localStorage.setItem("number_of_actions", ++conterAction); 
  if (document.getElementById(`check-${id}`).checked) {
    document.getElementById(`li-${id}`).style.textDecoration = "line-through";
  } else {
    document.getElementById(`li-${id}`).style.textDecoration = "none";
  }
}

function addItemToList(todoArray) {
  for (let i = todoArray.length - 1; 0 <= i ; i--) {
    document.querySelector("#my-list").insertAdjacentHTML("beforeend",`
    <li class="todo" id="li-${todoArray[i]["id"]}">
      <div class=icons><input type="checkbox" id="check-${todoArray[i]["id"]}"
       onchange="checkedItem(id.substr(6));">
       <span>${todoArray[i]["list"]}</span>
       </div>
       <div class="icon-edit">
       <span class="iconify" id="pen-${todoArray[i]["id"]}" data-icon="fa-solid:pen" 
       onclick="editToDo(id.substr(4))"></span><span class="iconify" id="bin-${todoArray[i]["id"]}" data-icon="ion:trash-bin" onclick="deleteToDo(id.substr(4))">
       </span></div>
    </li>`);
  }
}