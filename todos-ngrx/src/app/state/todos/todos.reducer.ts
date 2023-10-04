import { createReducer, on } from '@ngrx/store';
import {Todo} from "./todos.model";
import {loadTodosApi} from "./todos.actions";

export const initialState: ReadonlyArray<Todo> = [];

export const todosReducer = createReducer(
    initialState,
    on(loadTodosApi, (_state, { todos }) => todos)
);