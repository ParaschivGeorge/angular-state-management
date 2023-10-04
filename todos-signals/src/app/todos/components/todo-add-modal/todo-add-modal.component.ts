import {Component} from '@angular/core';
import {DialogRef} from "@angular/cdk/dialog";
import {TodosStoreService} from "../../services/todos-store.service";

@Component({
  selector: 'app-todo-add-modal',
  templateUrl: './todo-add-modal.component.html',
  styleUrls: ['./todo-add-modal.component.scss']
})
export class TodoAddModalComponent {
  task = '';

  constructor(private storeService: TodosStoreService, private dialogRef: DialogRef) {
  }

  add() {
    this.storeService.add$.next({task: this.task});
    this.dialogRef.close()
  }
}
