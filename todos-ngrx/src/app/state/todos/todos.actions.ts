import {createAction} from "@ngrx/store";
import {Todo} from "./todos.model";

export const loadTodos = createAction('[Todo List] Load Todos');
export const editTodo = createAction('[Todo List] Edit Todo', (todo: Todo) => ({todo}));
export const removeTodo = createAction('[Todo List] Remove Todo', (id: number) => ({id}));
export const loadTodosApi = createAction('[Todos API] Retrieved Todo List', (todos: ReadonlyArray<Todo>) => ({todos}));
export const addTodo = createAction('[Add Todo Modal] Add Todo', (task: string) => ({task}));
