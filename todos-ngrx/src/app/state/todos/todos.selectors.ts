import {createFeatureSelector, createSelector} from "@ngrx/store";
import {Todo} from "./todos.model";

export const selectTodos = createFeatureSelector<ReadonlyArray<Todo>>('todos');