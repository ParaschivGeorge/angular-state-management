import {Component} from '@angular/core';
import {DialogRef} from "@angular/cdk/dialog";
import {Store} from "@ngxs/store";
import {AddTodo} from "../../models/todos.actions";

@Component({
    selector: 'app-todo-add-modal',
    templateUrl: './todo-add-modal.component.html',
    styleUrls: ['./todo-add-modal.component.scss']
})
export class TodoAddModalComponent {
    task = '';

    constructor(private store: Store, private dialogRef: DialogRef) {
    }

    add() {
        this.store.dispatch(new AddTodo(this.task));
        this.dialogRef.close()
    }
}
