import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {Todo} from "../../models/todo";
import {TodosService} from "../../services/todos.service";
import {MatDialog} from "@angular/material/dialog";
import {TodoAddModalComponent} from "../todo-add-modal/todo-add-modal.component";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  todos$: Observable<Todo[]>;

  constructor(private todosService: TodosService, private dialog: MatDialog) {
    this.todos$ = todosService.getTodos();
  }

  addTodo() {
    this.dialog.open(TodoAddModalComponent, {
      height: '120px',
      width: '600px',
    });
    this.dialog.afterAllClosed.subscribe(() => this.refreshTodos())
  }

  markTodo(todo: Todo) {
    this.todosService.updateTodo(todo.id, todo).subscribe(() => this.refreshTodos());
  }

  removeTodo(todo: Todo) {
    this.todosService.removeTodo(todo.id).subscribe(() => this.refreshTodos());
  }

  private refreshTodos() {
    return this.todos$ = this.todosService.getTodos();
  }
}
