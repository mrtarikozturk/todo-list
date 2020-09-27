const form = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo');
const todoList = document.querySelector('.list-group');
const firstCardBody = document.querySelectorAll('.card-body')[0];
const secondCardBody = document.querySelectorAll('.card-body')[1];
const filter = document.querySelector('#filter');
const clearButton = document.querySelector('#clearTodos');


eventListeners();

function eventListeners() {
    form.addEventListener('submit', addTodo);
    document.addEventListener('DOMContentLoaded', loadAllTodosToUI);
    secondCardBody.addEventListener('click', deleteTodo);
}

// Burasi ana operasyonmerkezidir. Taptigim islemin aslinda iki yonu var. Birincisi UI tarafi digeri ise localstorage tarafidir.
function addTodo(e) {
    let newTodo = todoInput.value.trim();

    if (newTodo === '') {
        showAlert('danger', 'Please enter a todo...'); 
    } else {
        addTodoStorage(newTodo);
        addTodoUI(newTodo);
        console.log('Add to LocalStorage');
        showAlert('success', 'Todo successfully added.');
    }
    e.preventDefault();
}

function addTodoUI(newTodo) {
    
    // Create li element
    let listItem = document.createElement('li');
    listItem.className = 'list-group-item d-flex justify-content-between';

    // Create link 1. Method:
    listItem.innerHTML = `
    ${newTodo}
    <a href = "#" class ="delete-item">
        <i class = "fa fa-remove"></i>
    </a>`;

    // Create link 2. Method :
   /****************************************************
      let link = document.createElement('a');
    link.href = '#';
    link.className = 'delete-item';
    link.innerHTML = ' <i class = "fa fa-remove"></i>';
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);
   ****************************************************/

    // Adding listItem to todoList
    todoList.appendChild(listItem);
    todoInput.value = '';
}

function showAlert(type, message) {
    // <div class="alert alert-primary" role="alert">
    //     This is a primary alert—check it out!
    // </div>

    let alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.setAttribute('role', 'alert');
    alert.textContent = message;
    firstCardBody.appendChild(alert);

    window.setTimeout(function(){
        alert.remove();
    }, 1000);
}

function getTodosFromStorage() {
    let todos;

    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));        
    }
    return todos;
}

function addTodoStorage(newTodo) {
    let todos = getTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem('todos', JSON.stringify(todos));

    // if (todos.find(item => item.lowerCase() == newTodo.lowerCase()) == undefined) {
    //     showAlert('warning', 'This todo is already on the Your Todo List!!!');
    // } else {
    //     todos.push(newTodo);
    //     localStorage.setItem('todos', JSON.stringify(todos));
    // }
}

function loadAllTodosToUI() {
    let todos = getTodosFromStorage();
    todos.forEach(todo => addTodoUI(todo));
}

function deleteTodo(e) {
    if (e.target.className === 'fa fa-remove') {
        let todo = e.target.parentElement.parentElement;
        todo.remove();
        deleteTodoFromStorage(todo.textContent);
        showAlert('success', 'Todo successfully deleted...');
    }
}

function deleteTodoFromStorage(deletedTodo) {
    let todos = getTodosFromStorage();

    todos.forEach((todo, index)=> {
        if (todo === deletedTodo){
            todos.splice(index, 1);
        }
    });
    localStorage.setItem('todos', todos);
}


