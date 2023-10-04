import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Todo} from "../../models/todo";
import {MatDialog} from "@angular/material/dialog";
import {TodoAddModalComponent} from "../todo-add-modal/todo-add-modal.component";
import {TodosStore} from "./todos.store";

@Component({
    selector: 'app-todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.scss'],
    providers: [TodosStore]
})
export class TodoListComponent implements OnInit {
    todos$: Observable<Todo[]>;

    constructor(private readonly todosStore: TodosStore, private dialog: MatDialog) {
        this.todos$ = todosStore.todos$;
    }

    addTodo() {
        let matDialogRef = this.dialog.open(TodoAddModalComponent, {
            height: '120px',
            width: '600px',
        });
        matDialogRef.afterClosed().subscribe(res => {
            if (res?.data) {
                this.todosStore.addTodo(res.data);
            }
        })
    }

    markTodo(todo: Todo) {
        this.todosStore.editTodo({...todo, done: todo.done})
    }

    removeTodo(todo: Todo) {
        this.todosStore.removeTodo(todo.id);
    }

    ngOnInit(): void {
        this.todosStore.getTodos();
    }
}
