//Add task
let theInput = document.querySelector(".add-task input");
let addButton = document.querySelector(".add-task span");
//Task contents
let tasksContainer = document.querySelector(".tasks-content");
let noTasks = document.querySelector(".tasks-content .no-tasks-content");
let allTasks = Array.from(document.querySelectorAll(".tasks-content .task"));
let  completedTasks = Array.from(document.querySelectorAll(".tasks-content .task"))
                    .filter(element => element.firstChild.classList.contains("completed"));;
//Tasks count
let completedTasksCount = document.querySelector(".tasks-count .completed output");
let allTasksCount = document.querySelector(".tasks-count .tasks-num output");
//theme control
let inputColor = document.querySelector("input[type='color']");
console.log(localStorage.getItem("tasks"));
let parsed = JSON.parse(localStorage.getItem("tasks"));
console.log(parsed);

theInput.focus();
inputColor.oninput = function() {
    document.documentElement.style.setProperty("--main-color", inputColor.value);
}
document.addEventListener("click", function(e) {
    if(e.target.classList.contains("add-button-symbol")) {
        addTask();
    }
    if(e.target.classList.contains("delete-button")) {
        deleteTask(e.target);
    }
    if(e.target.closest(".task")) {
        completeTask(e.target.closest(".task"));
    }
    if(e.target.classList.contains("delete-all-button")) {
        deleteAllTasks();
    }
    if(e.target.classList.contains("complete-all-button")) {
        completeAllTasks();
    }
    allTasks = Array.from(document.querySelectorAll(".tasks-content .task"));
    completedTasks = Array.from(document.querySelectorAll(".tasks-content .task"))
                    .filter(element => element.firstChild.classList.contains("completed"));
    allTasksCount.textContent = allTasks.length;
    completedTasksCount.textContent = completedTasks.length;
    toggleNoTasks();
    localStorage.setItem("tasks", JSON.stringify(allTasks));
    
})

function addTask () {
    let newTask, taskText, deleteButton;
    if(theInput.value) {
        if(isUniqueTask()) {
            newTask = document.createElement("div");
            newTask.classList.add("task");
            taskText = document.createElement("p");
            taskText.textContent = theInput.value;
            deleteButton = document.createElement("span");
            deleteButton.appendChild(document.createTextNode("Delete"));
            deleteButton.classList.add("delete-button");
            newTask.appendChild(taskText);
            newTask.appendChild(deleteButton);
            tasksContainer.appendChild(newTask);
            theInput.value = "";
            theInput.focus();
        }
        else {
            theInput.value = "";
            swal("You Have Already Left This Task");
            theInput.focus();
        }
    }
    else {
        swal("Alert", "You Can't Add An Empty Task", "info");
    }
}
function deleteTask(x) {
    x.parentElement.remove();
}
function toggleNoTasks() {
    if(allTasks.length) {
        noTasks.classList.add("hidden");
    }
    else {
        noTasks.classList.remove("hidden");
    }
}
function completeTask(x) {
    x.firstChild.classList.toggle("completed");
}
function deleteAllTasks () {
    allTasks.forEach(element => element.remove());
}
function completeAllTasks () {
    if(completedTasks.length != allTasks.length) {
        allTasks.filter(element => !element.firstChild.classList.contains("completed"))
        .forEach(element => element.firstChild.classList.add("completed"));
    }
    else {
        completedTasks.forEach(element => element.firstChild.classList.remove("completed"));
    }
}
function isUniqueTask() {
    let check = true;
    allTasks.forEach(element => {
        if(element.firstChild.textContent == theInput.value) {
            check = false;
        }
    })
    return check;
}