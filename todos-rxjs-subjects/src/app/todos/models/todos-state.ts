import {Todo} from "./todo";
import {Subject} from "rxjs";

export interface TodosState {
  todos: Subject<Todo[]>;
}
