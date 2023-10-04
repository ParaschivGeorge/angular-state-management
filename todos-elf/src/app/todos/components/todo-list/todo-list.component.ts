import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Todo} from "../../models/todo";
import {MatDialog} from "@angular/material/dialog";
import {TodoAddModalComponent} from "../todo-add-modal/todo-add-modal.component";
import {Actions} from "@ngneat/effects-ng";
import {editTodo, loadTodos, removeTodo} from "../../models/todo.actions";
import {TodosRepository} from "../../models/todo.repository";

@Component({
    selector: 'app-todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
    todos$: Observable<Todo[]>;

    constructor(private dialog: MatDialog, private actions: Actions, private todosRepository: TodosRepository) {
        this.todos$ = todosRepository.todos$;
    }

    addTodo() {
        this.dialog.open(TodoAddModalComponent, {
            height: '120px',
            width: '600px',
        });
    }

    markTodo(todo: Todo) {
        this.actions.dispatch(editTodo(todo));
    }

    removeTodo(todo: Todo) {
        this.actions.dispatch(removeTodo(todo.id))
    }

    ngOnInit(): void {
        this.actions.dispatch(loadTodos());
    }
}
