import {Component} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
    selector: 'app-todo-add-modal',
    templateUrl: './todo-add-modal.component.html',
    styleUrls: ['./todo-add-modal.component.scss']
})
export class TodoAddModalComponent {
    task = '';

    constructor(private dialogRef: MatDialogRef<TodoAddModalComponent>) {
    }

    add() {
        this.dialogRef.close({data: this.task});
    }
}
