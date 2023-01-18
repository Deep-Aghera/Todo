//console.log("Hellow world");
let addInput = document.getElementById("add-input");

function handleInputChange(e) {
    console.log(typeof(e.value));
    let inputTxt = document.getElementById("add-input");
   // console.log("check get function", getArrayListFromLocalSrorage());
   console.log(inputTxt.value);
    let tempObj = {
        task : inputTxt.value,
        isCompleted : false
    }
    if(chekDublicate(tempObj)) {
        alert("already contain this task");
        return;
    }

    StoreValueIntoLocalStorage(tempObj);
    console.log(getArrayListFromLocalSrorage());
    loadTask();
}

function StoreValueIntoLocalStorage(val) {
    //console.log("===>",val)
    let listLocal = localStorage.getItem("list");
    //console.log("local",listLocal);
   // console.log(JSON.parse(listLocal));
    if(listLocal === '' || listLocal === null || listLocal === 'null') {
        console.log("Inside if block")
        let listArray1 = [];
        listArray1.push(val);
        localStorage.setItem("list",JSON.stringify(listArray1));
        return;
    }
    let listArray = JSON.parse(listLocal);
    listArray.push(val);
    localStorage.setItem("list",JSON.stringify(listArray))
}

function getArrayListFromLocalSrorage() {
    let listLocal = localStorage.getItem("list");
    let listArray = JSON.parse(listLocal);
    if(listArray == null || listArray == "null") {
        return [];
    }
    return listArray;
}

///                     checkbox
function handleCheckBox(e) {
   
    let tempTask = e.nextElementSibling;
    tempTask.className = "checked";
    console.log("check",tempTask.innerHTML)
    let tempUpdateValue = tempTask.innerHTML;
    let taskList = getArrayListFromLocalSrorage();
    console.log("Befor update ==>",getArrayListFromLocalSrorage());
    let tempTaskList = getArrayListFromLocalSrorage().map((task) => {
       if(task.task == tempUpdateValue) {
        return {
            task :task.task,
            isCompleted : !task.isCompleted
        }
       }
       else {
        return task;
       }
    })
    console.log("updated list",tempTaskList);
    localStorage.setItem("list",JSON.stringify(tempTaskList));
}

//                          adding list

window.onload = loadTask;

function loadTask() {
    let listOfTask = document.getElementById("list-of-elements");
    listOfTask.innerHTML = "";
    console.log(listOfTask);
    let taskList = getArrayListFromLocalSrorage();
    taskList.map((task) => {
        let checkClass = task.isCompleted ? "checked" : "not-checked";
        const wrapDiv = document.createElement("div");
        wrapDiv.innerHTML = `<div class="list-of-elements" id="list-of-elements">
        <div class="list-element">
            <input type="checkbox" onchange="handleCheckBox(this)" ${task.isCompleted?"checked" : ""} name="" id="">
            <p class="${checkClass}">${task.task}</p>
            <button onclick="handleDelete(this)">Delete</button>
        </div>
    </div>`
    listOfTask.appendChild(wrapDiv);
        //console.log(task)
    })
}

//                   check dublicate

function chekDublicate(val) {
    let taskList = getArrayListFromLocalSrorage();
    let doesContainDublicate = false;
    taskList.map((task) => {
        if(val.task == task.task) {
            //console.log("found the elemet",task.task)
            doesContainDublicate = true
        }
       // console.log("Inside =>",task,doesContainDublicate)
    });
    return doesContainDublicate;
}

//                  delete item 
function handleDelete(e) {
console.log("from delete=>");
console.log(e.previousElementSibling.innerHTML)
//e.parentElement.remove();

}