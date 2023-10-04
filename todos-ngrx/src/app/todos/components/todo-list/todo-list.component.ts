import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {TodoAddModalComponent} from "../todo-add-modal/todo-add-modal.component";
import {Store} from "@ngrx/store";
import {Todo} from "../../../state/todos/todos.model";
import {editTodo, loadTodos, removeTodo} from "../../../state/todos/todos.actions";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit{
  todos$: Observable<Todo[]>;

  constructor(private store: Store<{ todos: Todo[] }>, private dialog: MatDialog) {
    this.todos$ = this.store.select(state => state.todos);
  }

  addTodo() {
    this.dialog.open(TodoAddModalComponent, {
      height: '120px',
      width: '600px',
    });
  }

  markTodo(todo: Todo) {
    this.store.dispatch(editTodo({...todo, done: !todo.done}));
  }

  removeTodo(todo: Todo) {
    this.store.dispatch(removeTodo(todo.id));
  }

  ngOnInit(): void {
    this.store.dispatch(loadTodos());
  }
}
