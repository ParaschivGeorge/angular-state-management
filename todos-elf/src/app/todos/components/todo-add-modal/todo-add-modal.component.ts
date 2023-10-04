import {Component} from '@angular/core';
import {DialogRef} from "@angular/cdk/dialog";
import {addTodo} from "../../models/todo.actions";
import {Actions} from "@ngneat/effects-ng";

@Component({
    selector: 'app-todo-add-modal',
    templateUrl: './todo-add-modal.component.html',
    styleUrls: ['./todo-add-modal.component.scss']
})
export class TodoAddModalComponent {
    task = '';

    constructor(private actions: Actions, private dialogRef: DialogRef) {
    }

    add() {
        this.actions.dispatch(addTodo(this.task));
        this.dialogRef.close()
    }
}
