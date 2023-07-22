const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const button = document.getElementById("add");
const checked = document.getElementById("completed");
const total = document.getElementById("total");
const pending = document.getElementById("pending");

var checkedCount = 0;
var totalTaskCount = 0;
var pendingTaskCount = 0;

inputBox.addEventListener("keypress",  function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        addTask(); // press enter key to add the task
    }
});

function addTask(){
    if (inputBox.value === ''){
        alert("YOU MUST WRITE SOMETHING"); // alert for negative case
    }
    else{
        let li = document.createElement("li");
        let span =document.createElement("span");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        totalTaskCount++;
        pendingTaskCount++;
        total.innerHTML = totalTaskCount;
        pending.innerHTML = pendingTaskCount;
    }
    inputBox.value=""; //errase the content in the input box
    saveData(); // save the data in local
}

listContainer.addEventListener("click", function(e){
    
    if (e.target.tagName === "LI"){

        e.target.classList.toggle("checked"); // check the task as completed
        let hasClass = e.target.classList.contains('checked');
        if (hasClass){
            checkedCount++;
            pendingTaskCount--;
        }
        else{
            checkedCount--;
            pendingTaskCount++;
        }
        checked.innerHTML = checkedCount;
        pending.innerHTML = pendingTaskCount;
        saveData(); // save the data in local
    }
    else if(e.target.tagName === "SPAN"){
        if (confirm("Do you want to remove this task?")) {
            let hasClass = e.target.parentElement.classList.contains('checked');
            if (hasClass){
                checkedCount--;
                totalTaskCount--;
            }
            else{
                pendingTaskCount--;
                totalTaskCount--;
            }
            e.target.parentElement.remove(); // Remove the task
            checked.innerHTML = checkedCount;
            pending.innerHTML = pendingTaskCount;
            total.innerHTML = totalTaskCount;
            saveData(); // save the data in local
        }
    }
}, false);

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
    localStorage.setItem("total", total.innerHTML);
    localStorage.setItem("pending", pending.innerHTML);
    localStorage.setItem("checked", checked.innerHTML);
}

function getSavedData(){
    listContainer.innerHTML = localStorage.getItem("data");
    checkedCount = localStorage.getItem("checked");
    pendingTaskCount = localStorage.getItem("pending");
    totalTaskCount = localStorage.getItem("total");
    if (checkedCount === null){
        checkedCount = 0;
        totalTaskCount = 0;
        pendingTaskCount = 0;
    }
    checked.innerHTML = checkedCount;
    pending.innerHTML = pendingTaskCount;
    total.innerHTML = totalTaskCount;
}

getSavedData();