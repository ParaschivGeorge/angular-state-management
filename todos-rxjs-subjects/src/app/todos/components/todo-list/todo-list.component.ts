import {Component} from '@angular/core';
import {Observable} from "rxjs";
import {Todo} from "../../models/todo";
import {MatDialog} from "@angular/material/dialog";
import {TodoAddModalComponent} from "../todo-add-modal/todo-add-modal.component";
import {TodosStoreService} from "../../services/todos-store.service";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  todos$: Observable<Todo[]>;

  constructor(private storeService: TodosStoreService, private dialog: MatDialog) {
    this.todos$ = storeService.todos;
  }

  addTodo() {
    this.dialog.open(TodoAddModalComponent, {
      height: '120px',
      width: '600px',
    });
  }

  markTodo(todo: Todo) {
    this.storeService.edit$.next(todo);
  }

  removeTodo(todo: Todo) {
    this.storeService.remove$.next(todo.id);
  }
}
