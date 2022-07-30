// getting all required elements
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");


// onkeyup event
inputBox.onkeyup = ()=>{
    //getting user entered value
  let userEnteredValue = inputBox.value; 
  //if the user value isn't only spaces
  if(userEnteredValue.trim() != 0){ 
    //active the add button
    addBtn.classList.add("active"); 
  }else{
    //unactive the add button
    addBtn.classList.remove("active"); 
  }
}


//calling showTask function
showTasks(); 
//when user click on plus icon button
addBtn.onclick = ()=>{ 
    //getting input field value
  let userEnteredValue = inputBox.value; 
  //getting localstorage
  let getLocalStorageData = localStorage.getItem("New Todo"); 
  //if localstorage has no data
  if(getLocalStorageData == null){ 
     //create a blank array
    listArray = [];
  }else{
    //transforming json string into a js object
    listArray = JSON.parse(getLocalStorageData);  
  }
  //pushing or adding new value in array
  listArray.push(userEnteredValue); 
  //transforming js object into a json string
  localStorage.setItem("New Todo", JSON.stringify(listArray)); 
  //calling showTask function
  showTasks(); 
  //unactive the add button once the task added
  addBtn.classList.remove("active"); 
}


function showTasks(){
  let getLocalStorageData = localStorage.getItem("New Todo");
  if(getLocalStorageData == null){
    listArray = [];
  }else{
    listArray = JSON.parse(getLocalStorageData); 
  }
  const pendingTasksNumb = document.querySelector(".pendingTasks");
  //passing the array length in pendingtask
  pendingTasksNumb.textContent = listArray.length; 
  //if array length is greater than 0
  if(listArray.length > 0){ 
    //active the delete button
    deleteAllBtn.classList.add("active"); 
  }else{
    //unactive the delete button
    deleteAllBtn.classList.remove("active"); 
  }
  let newLiTag = "";
  listArray.forEach((element, index) => {
    newLiTag += `<li>${element}<span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
  });
  //adding new li tag inside ul tag
  todoList.innerHTML = newLiTag; 
  //once task added leave the input field blank
  inputBox.value = ""; 
}


// delete task function
function deleteTask(index){
  let getLocalStorageData = localStorage.getItem("New Todo");
  listArray = JSON.parse(getLocalStorageData);
  //delete or remove the li
  listArray.splice(index, 1); 
  localStorage.setItem("New Todo", JSON.stringify(listArray));
  //call the showTasks function
  showTasks(); 
}


// delete all tasks function
deleteAllBtn.onclick = ()=>{
    //empty the array
  listArray = []; 
  //set the item in localstorage
  localStorage.setItem("New Todo", JSON.stringify(listArray)); 
  //call the showTasks function
  showTasks(); 
}