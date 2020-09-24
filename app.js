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
}

function addTodo(e) {
    let newTodo = todoInput.value.trim();

    if (newTodo === '') {
        alert('Please enter todo...'); 
    } else {
        console.log('Add to UI');
        console.log('Add to LocalStorage');
        alert('Add todo successfully');
    }
    e.preventDefault();
}



