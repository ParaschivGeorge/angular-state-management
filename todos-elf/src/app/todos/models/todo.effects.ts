import {createEffect, ofType} from '@ngneat/effects';
import {switchMap, tap} from "rxjs";
import {TodosService} from "../services/todos.service";
import {addTodo, editTodo, loadTodos, removeTodo} from "./todo.actions";
import {Injectable} from "@angular/core";
import {Todo} from "./todo";
import {TodosRepository} from "./todo.repository";

@Injectable({
    providedIn: 'root'
})
export class TodoEffects {

    constructor(private todosService: TodosService, private todosRepository: TodosRepository) {
    }

    loadTodos$ = createEffect(actions =>
        actions.pipe(
            ofType(loadTodos),
            switchMap(() => this.todosService.getTodos()),
            tap(this.todosRepository.setTodos)
        )
    );

    addTodos$ = createEffect(actions =>
        actions.pipe(
            ofType(addTodo),
            switchMap((addTodo: { task: string }) => this.todosService.addTodo(addTodo)),
            tap(() => actions.next(loadTodos))
        )
    );

    editTodos$ = createEffect(actions =>
        actions.pipe(
            ofType(editTodo),
            switchMap((editTodo: { todo: Todo }) => this.todosService.updateTodo(editTodo.todo)),
            tap(() => actions.next(loadTodos))
        )
    );

    removeTodos$ = createEffect(actions =>
        actions.pipe(
            ofType(removeTodo),
            switchMap(({id}) => this.todosService.removeTodo(id)),
            tap(() => actions.next(loadTodos))
        )
    );
}