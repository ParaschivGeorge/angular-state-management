import {createAction} from "@ngneat/effects";
import {Todo} from "./todo";

export const loadTodos = createAction('[Todos] Load');
export const addTodo = createAction('[Todos] Add', (task: string) => ({task}));
export const editTodo = createAction('[Todos] Edit', (todo: Todo) => ({todo}));
export const removeTodo = createAction('[Todos] Remove', (id: number) => ({id}));