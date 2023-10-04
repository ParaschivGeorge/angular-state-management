// noinspection TypeScriptValidateTypes

import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, EMPTY, exhaustMap, map, mergeMap} from "rxjs";
import {TodosService} from "./todos.service";
import {addTodo, editTodo, loadTodos, loadTodosApi, removeTodo} from "./todos.actions";
import {Todo} from "./todos.model";

@Injectable()
export class TodosEffects {

    constructor(
        private actions$: Actions,
        private todosService: TodosService
    ) {
    }

    loadTodos$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadTodos),
            exhaustMap(() =>
                this.todosService.getTodos().pipe(
                    map((todos: Todo[]) => loadTodosApi(todos)),
                    catchError(() => EMPTY)
                ))
        )
    );

    addTodo$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addTodo),
            mergeMap((todo) =>
                this.todosService.addTodo(todo).pipe(
                    map(() => loadTodos()),
                    catchError(() => EMPTY)
                ))
        )
    );

    editTodo$ = createEffect(() =>
        this.actions$.pipe(
            ofType(editTodo),
            mergeMap(({todo}) =>
                this.todosService.updateTodo(todo).pipe(
                    map(() => loadTodos()),
                    catchError(() => EMPTY)
                ))
        )
    );

    removeTodo$ = createEffect(() =>
        this.actions$.pipe(
            ofType(removeTodo),
            mergeMap(({id}) =>
                this.todosService.removeTodo(id).pipe(
                    map(() => loadTodos()),
                    catchError(() => EMPTY)
                ))
        )
    );
}