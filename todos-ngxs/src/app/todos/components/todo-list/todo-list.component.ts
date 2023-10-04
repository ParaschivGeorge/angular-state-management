import {Component, OnInit} from '@angular/core';
import {Todo} from "../../models/todo";
import {MatDialog} from "@angular/material/dialog";
import {TodoAddModalComponent} from "../todo-add-modal/todo-add-modal.component";
import {Select, Store} from "@ngxs/store";
import {EditTodo, LoadTodos, RemoveTodo} from "../../models/todos.actions";
import {Observable} from "rxjs";
import {TodosState} from "../../models/todos.state";

@Component({
    selector: 'app-todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
    todos$: Observable<Todo[]>;

    constructor(private store: Store, private dialog: MatDialog) {
        this.todos$ = this.store.select(TodosState.todos);
    }

    addTodo() {
        this.dialog.open(TodoAddModalComponent, {
            height: '120px',
            width: '600px',
        });
    }

    markTodo(todo: Todo) {
        this.store.dispatch(new EditTodo({...todo, done: !todo.done}));
    }

    removeTodo(todo: Todo) {
        this.store.dispatch(new RemoveTodo(todo.id));
    }

    ngOnInit(): void {
        this.store.dispatch(new LoadTodos());
    }
}
