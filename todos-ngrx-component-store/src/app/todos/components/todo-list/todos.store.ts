import {Todo} from "../../models/todo";
import {Injectable} from "@angular/core";
import {ComponentStore, tapResponse} from "@ngrx/component-store";
import {exhaustMap, Observable, switchMap} from "rxjs";
import {TodosService} from "../../services/todos.service";

export interface TodosState {
    todos: Todo[];
}

@Injectable()
export class TodosStore extends ComponentStore<TodosState> {

    constructor(private todosService: TodosService) {
        super({todos: []});
    }

    // selectors
    readonly todos$: Observable<Todo[]> = this.select(state => state.todos);

    // effects
    readonly getTodos = this.effect<void>((trigger$) => trigger$.pipe(
        exhaustMap(() =>
            this.todosService.getTodos().pipe(
                tapResponse({
                    next: (todos) => this.setTodos(todos),
                    error<E>(error: E): void {
                    }
                })
            )
        )
    ))

    readonly addTodo = this.effect<string>((task$: Observable<string>) => task$.pipe(
        switchMap((task) =>
            this.todosService.addTodo({task}).pipe(
                tapResponse({
                    next: (todos) => this.getTodos(),
                    error<E>(error: E): void {
                    }
                })
            )
        )
    ))

    readonly removeTodo = this.effect<number>((id$: Observable<number>) => id$.pipe(
        switchMap((id) =>
            this.todosService.removeTodo(id).pipe(
                tapResponse({
                    next: (todos) => this.getTodos(),
                    error<E>(error: E): void {
                    }
                })
            )
        )
    ))

    readonly editTodo = this.effect<Todo>((todo$: Observable<Todo>) => todo$.pipe(
        switchMap((todo) =>
            this.todosService.updateTodo(todo).pipe(
                tapResponse({
                    next: (todos) => this.getTodos(),
                    error<E>(error: E): void {
                    }
                })
            )
        )
    ))

    // reducers
    readonly setTodos = this.updater((state, todos: Todo[]) => ({
        todos: todos,
    }));
}