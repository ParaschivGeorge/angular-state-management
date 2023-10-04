import {computed, Injectable, signal} from '@angular/core';
import {Subject} from "rxjs";
import {TodosService} from "./todos.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {Todo} from "../models/todo";
import {TodosState} from "../models/todos-state";

@Injectable({
  providedIn: 'root'
})
export class TodosStoreService {

  constructor(private todosService: TodosService) {
    // reducers
    this.add$.subscribe(addTodo => {
      this.todosService.addTodo(addTodo).subscribe(
        () => this.loadTodos()
      )
    });

    this.edit$.subscribe(editTodo => {
      this.todosService.updateTodo(editTodo).subscribe(
        () => this.loadTodos()
      )
    });

    this.remove$.pipe(takeUntilDestroyed()).subscribe(removeTodo => {
      this.todosService.removeTodo(removeTodo).subscribe(
        () => this.loadTodos()
      )
    });

    this.loadTodos();
  }

  private state = signal<TodosState>({
    todos: []
  });

  // selectors
  todos = computed(() => this.state().todos);

  //sources
  add$ = new Subject<{ task: string }>();
  edit$ = new Subject<Todo>();
  remove$ = new Subject<number>();

  private loadTodos() {
    this.todosService.getTodos().subscribe(todos => this.state.update(() => ({todos})));
  }
}
