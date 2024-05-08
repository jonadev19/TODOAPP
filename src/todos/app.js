import html from './app.html?raw'
import todoStore, { Filters } from '../store/todo.store'
import { renderPending, renderTodos } from './usecases'

const elementIds = {
  TodoList: '.todo-list',
  TodoInput: '#new-todo-input',
  Toggle: '.toggle',
  ClearCompleted: '.clear-completed',
  TodoFilters: '.filtro',
  PendingCount: '#pending-count',
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
  const buttonClearCompleted = document.querySelector( elementIds.ClearCompleted )
  const filtersUl = document.querySelectorAll( elementIds.TodoFilters );
  const pendingCount = document.querySelector( elementIds.PendingCount )

  console.log(filtersUl)

  //Listeners
  newDescriptionInput.addEventListener('keydown', ( event ) => {
    if( event.keyCode == 13 ){
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

  buttonClearCompleted.addEventListener('click', () => {
    todoStore.deleteCompleted()
    renderTodos()
  })
  
  filtersUl.forEach( element => {
    element.addEventListener('click', ( element ) => {
      filtersUl.forEach( el => el.classList.remove('selected'))
      element.target.classList.add('selected')

      switch( element.target.text ){
        case 'Todos':
          todoStore.setSelectedFilter( Filters.All )
        break;
        case 'Pendientes':
          todoStore.setSelectedFilter( Filters.Pending )
        break;
        case 'Completados':
          todoStore.setSelectedFilter( Filters.Completed )
        break;
      }
        renderTodos()
    })
  })







}