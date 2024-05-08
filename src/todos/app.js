import html from './app.html?raw'
import todoStore from '../store/todo.store'
import { renderTodos } from './usecases'

const elementIds = {
  TodoList: '.todo-list',
  TodoInput: '#new-todo-input',
  Toggle: '.toggle',
}

export const App = ( elementId ) => {
  

  (()=> {
    const app = document.createElement('div');
    app.innerHTML = html;
    document.querySelector( elementId ).append( app );
    renderTodos( elementIds.TodoList )
  })();

  //Referencias HTML
  const newDescriptionInput = document.querySelector( elementIds.TodoInput )
  const todoList = document.querySelector( elementIds.TodoList )


  //Listeners
  newDescriptionInput.addEventListener('keydown', ( event ) => {
    if( event.code == "Enter" ){
      if( event.target.value.trim().length <= 2 ) return
      todoStore.addTodo( event.target.value )
      renderTodos()
      event.target.value = '';
    }  
  })

  todoList.addEventListener('click', (event) => {
    if( event.target.classList.contains('toggle') ) {
      todoStore.toggleTodo( event.target.closest('[data-id]').getAttribute('data-id') )
      renderTodos()
    }
  })
  
  todoList.addEventListener('click', (event) => {
    if( event.target.classList.contains('destroy') ){
      todoStore.deleteTodo( event.target.closest('[data-id]').getAttribute('data-id') )
      renderTodos()
    }
  })








}