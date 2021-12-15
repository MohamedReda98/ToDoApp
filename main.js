// Elements to control
let input = document.querySelector('.input');
let button = document.querySelector('.add');
let tasks = document.querySelector('.tasks');
// Take the data from the local storage
refresh();

button.addEventListener('click',_ => {
    if (input.value!==""){
        console.log(input.value);
        let inputValue = input.value;
        let AllTasks = [];
        if(window.localStorage.getItem('task') != null){
            let lastTasks = JSON.parse(window.localStorage.getItem('task'));
            let newTask = {id:`${Date.now()}`,title:`${inputValue}`};
            lastTasks.push(newTask);
            AllTasks = lastTasks;
        }else{
            let newTask = {id:`${Date.now()}`,title:`${inputValue}`};
            AllTasks.push(newTask);
        }
        window.localStorage.setItem('task',JSON.stringify(AllTasks));
        input.value = "";
        refresh();
    }
})
function refresh() {
    if (window.localStorage.getItem('task') != null){
        let taskStorage = JSON.parse(window.localStorage.getItem('task')) ;
        tasks.innerHTML = "";
        for (let i=0; i<taskStorage.length ; i++) {
            createTask(taskStorage[i].title, taskStorage[i].id)
        }
    }
}
function createTask(TaskName, TaskId) {
    // create div
    let myDiv = document.createElement('div');
    // create button
    let myBtn = document.createElement('button');
    // add text to button
    myBtn.textContent = 'Delete';
    // add id to button
    myBtn.setAttribute('id',`${TaskId}`);
    myBtn.addEventListener('click',_ => deleteTask(TaskId));
    // add text to div
    myDiv.textContent = TaskName;
    // add button to div
    myDiv.appendChild(myBtn);
    // add class to div
    myDiv.classList.add('item');
    // add div to tasks container
    tasks.appendChild(myDiv);
}

function deleteTask(TaskId) {
    let taskStorage = JSON.parse(window.localStorage.getItem('task')) ;
    let theNewTasks = [];
        for (let i=0; i<taskStorage.length ; i++) {
            if (taskStorage[i].id !== TaskId){
                theNewTasks.push(taskStorage[i]);
            }
        }
    window.localStorage.setItem('task',JSON.stringify(theNewTasks));
    refresh();
}
