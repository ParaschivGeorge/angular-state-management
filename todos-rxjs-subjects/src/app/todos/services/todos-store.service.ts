import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import {TodosService} from "./todos.service";
import {Todo} from "../models/todo";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {TodosState} from "../models/todos-state";

@Injectable({
  providedIn: 'root'
})
export class TodosStoreService {

  constructor(private todosService: TodosService) {
    // reducers
    this.add$.pipe(takeUntilDestroyed()).subscribe(addTodo => {
      this.todosService.addTodo(addTodo).subscribe(
        () => this.loadTodos()
      )
    });

    this.edit$.pipe(takeUntilDestroyed()).subscribe(editTodo => {
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

  private state: TodosState = {todos: new BehaviorSubject<Todo[]>([])};

  // selectors
  todos = this.state.todos;

  //sources
  add$ = new Subject<{ task: string }>();
  edit$ = new Subject<Todo>();
  remove$ = new Subject<number>();

  private loadTodos() {
    this.todosService.getTodos().subscribe(todos => this.state.todos.next(todos))
  }
}
