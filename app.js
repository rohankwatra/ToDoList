// Selectors

// INPUT FIELD WITH PLUS SIGN BUTTON
let todoInput = document.querySelector('.todo-input');

// PLUS SIZE BUTTON
let todoButton = document.querySelector('.todo-button');

// ACCESSING THE UL LIST
let todoList = document.querySelector('.todo-list');

// ACCESING THE SELECT TAG IN DIV WITH CLASS SELECT
let filterTodo = document.querySelector('.filter-todo');

// Event Listeners
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterTodo.addEventListener('click', handleFilterTodo);
document.addEventListener('DOMContentLoaded', getTodos);

// Functions
function addTodo(event){
    // PREVENT FORM FROM SUBMITTINHG
    event.preventDefault();

    // To do div
    let todoDiv = document.createElement('div');

    // Adding class to div
    todoDiv.classList.add('todo');

    // Adding li in div
    let newTodo = document.createElement('li');

    // Adding text to newTodo
    newTodo.innerText = todoInput.value;

    // Adding class to newTodo item
    newTodo.classList.add('todo-item');

    // Appending the child of newtodo in div
    todoDiv.appendChild(newTodo);

    // Add todo to localStorage
    saveLocaltodos(todoInput.value);   

    // Creating a check mark button
    let completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class = "fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);
    
    // Creating a trash button
    let trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class = "fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    // Finally appending the new div created to ul list
    todoList.appendChild(todoDiv);

    // to clear the value in input tag after adding it
    todoInput.value = '';
}

function deleteCheck(e){
    let item = e.target;

    // to delete todo
    if(item.classList[0]==='trash-btn'){
        let todo = item.parentElement;

        // Transition
        todo.classList.add('fall');

        // to remove from local storage
        removeLocaltodos(todo);

        // todo deletion after transition ends
        todo.addEventListener("transitionend",function(){
            todo.remove();
        })
    }
    
    // to complete todo
    if(item.classList[0]==='complete-btn'){
        let todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function handleFilterTodo(e){

    let todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
        case "all":
            todo.style.display = 'flex';
            break;
        case "completed":
            if(todo.classList.contains("completed")){
            todo.style.display = 'flex';
            }
            else{
                todo.style.display = "none";
            }
            break;
        case "incompleted": 
            if(!todo.classList.contains("completed")){
                todo.style.display = 'flex';
            }
            else{
                todo.style.display = "none";
            }
            break;
        }
    });
}

// TO SAVE TODOS IN LOCAL STORAGE
function saveLocaltodos(todo){
    // TO CHECK IF ALREADY HAVE THINGS IN THERE
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos' , JSON.stringify(todos));
}

// TO GET TODOS IN UI
function getTodos(){
    // TO CHECK IF ALREADY HAVE THINGS IN THERE
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
    // To do div
    let todoDiv = document.createElement('div');

    // Adding class to div
    todoDiv.classList.add('todo');

    // Adding li in div
    let newTodo = document.createElement('li');

    // Adding text to newTodo
    newTodo.innerText = todo;

    // Adding class to newTodo item
    newTodo.classList.add('todo-item');

    // Appending the child of newtodo in div
    todoDiv.appendChild(newTodo);

    // Creating a check mark button
    let completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class = "fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);
    
    // Creating a trash button
    let trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class = "fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    // Finally appending the new div created to ul list
    todoList.appendChild(todoDiv);
    });
}

// TO REMOVE TODOS FROM LOCAL STORAGE WHEN REMOVED FROM UI
function removeLocaltodos(todo){
    // TO CHECK IF ALREADY HAVE THINGS IN THERE
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    let todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}