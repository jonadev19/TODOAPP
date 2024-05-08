import todoStore from "../../store/todo.store";
import { renderPending } from "./render-pending";
import { todoHTML } from "./todoHTML";

let element;

export const renderTodos = ( elementId ) => {

  if( !element )
    element = document.querySelector( elementId );

  if( !element ) throw new Error('ElementID not found')
  const todos = todoStore.getTodos( todoStore.getCurrentFilter() )

  element.innerHTML = ''

  todos.forEach( todo => {
      element.append( todoHTML( todo ) )
    })

  const updatePendingCount = () => {
    renderPending( '#pending-count' )
  }
  
  updatePendingCount()
}