import html from './app.html?raw';
import todoStore, { Filters } from '../store/todo.store';
import { renderPending, renderTodos } from './usecases';

const elementIds = {
  TodoList: '.todo-list',
  TodoInput: '#new-todo-input',
  ClearCompleted: '.clear-completed',
  TodoFilters: '.filtro',
  PendingCount: '#pending-count',
};

export const App = (elementId) => {
  const displayTodos = () => {
    const todos = todoStore.getTodos(todoStore.getCurrentFilter());
    renderTodos(elementIds.TodoList, todos);
    updatePendingCount();
  };

  const updatePendingCount = () => {
    renderPending(elementIds.PendingCount);
  };

  // When the function App is called
  (() => {
    const app = document.createElement('div');
    app.innerHTML = html;
    document.querySelector(elementId).append(app);
    displayTodos();
  })();

  // HTML References
  const newDescriptionInput = document.querySelector(elementIds.TodoInput);
  const todoListUL = document.querySelector(elementIds.TodoList);
  const clearCompletedButton = document.querySelector(
    elementIds.ClearCompleted
  );
  const filtersLIs = document.querySelectorAll(elementIds.TodoFilters);

  // Listeners
  newDescriptionInput.addEventListener('keyup', (event) => {
    if (event.key !== 'Enter') return;
    if (event.target.value.trim().length === 0) return;

    todoStore.addTodo(event.target.value);
    displayTodos();
    event.target.value = '';
  });

  todoListUL.addEventListener('click', (event) => {
    const element = event.target.closest('[data-id]');
    if (!element) return;

    const todoId = element.getAttribute('data-id');

    if (event.target.matches('.toggle')) {
      todoStore.toggleTodo(todoId);
    } else if (event.target.matches('.destroy')) {
      todoStore.deleteTodo(todoId);
    } else {
      return;
    }

    displayTodos();
  });

  clearCompletedButton.addEventListener('click', () => {
    todoStore.deleteCompleted();
    displayTodos();
  });

  filtersLIs.forEach((element) => {
    element.addEventListener('click', (event) => {
      filtersLIs.forEach((el) => el.classList.remove('selected'));
      event.target.classList.add('selected');

      switch (event.target.text) {
        case 'Todos':
          todoStore.setSelectedFilter(Filters.All);
          break;
        case 'Pendientes':
          todoStore.setSelectedFilter(Filters.Pending);
          break;
        case 'Completados':
          todoStore.setSelectedFilter(Filters.Completed);
          break;
      }
      displayTodos();
    });
  });
};