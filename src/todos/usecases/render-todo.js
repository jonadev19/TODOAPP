import { todoHTML } from './todoHTML';

let element;
export const renderTodos = (elementId, todos = []) => {
  if (!element) element = document.querySelector(elementId);

  if (!element) throw new Error('ElementID not found');

  element.innerHTML = '';

  todos.forEach((todo) => {
    element.append(todoHTML(todo));
  });
};