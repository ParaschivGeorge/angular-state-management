import { Component } from '@angular/core';
import {TodosService} from "../../services/todos.service";
import {Todo} from "../../models/todo";
import {DialogRef} from "@angular/cdk/dialog";

@Component({
  selector: 'app-todo-add-modal',
  templateUrl: './todo-add-modal.component.html',
  styleUrls: ['./todo-add-modal.component.scss']
})
export class TodoAddModalComponent {
  task = '';

  constructor(private todosService: TodosService, private dialogRef: DialogRef) {
  }

  add() {
    this.todosService.addTodo({task: this.task, done: false} as Todo).subscribe(() => this.dialogRef.close());
  }
}
