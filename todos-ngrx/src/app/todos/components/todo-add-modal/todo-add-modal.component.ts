import {Component} from '@angular/core';
import {DialogRef} from "@angular/cdk/dialog";
import {Store} from "@ngrx/store";
import {Todo} from "../../../state/todos/todos.model";
import {addTodo} from "../../../state/todos/todos.actions";

@Component({
  selector: 'app-todo-add-modal',
  templateUrl: './todo-add-modal.component.html',
  styleUrls: ['./todo-add-modal.component.scss']
})
export class TodoAddModalComponent {
  task = '';

  constructor(private store: Store<{ todos: Todo[] }>, private dialogRef: DialogRef) {
  }

  add() {
    this.store.dispatch(addTodo(this.task));
    this.dialogRef.close()
  }
}
