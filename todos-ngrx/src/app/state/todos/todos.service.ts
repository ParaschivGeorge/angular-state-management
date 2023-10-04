import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Todo} from "./todos.model";

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  private readonly url = "http://localhost:3000/todos"

  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.url);
  }

  addTodo(todo: { task: string }): Observable<any> {
    return this.http.post(this.url, todo);
  }

  removeTodo(id: number): Observable<any> {
    return this.http.delete(this.url + `/${id}`);
  }

  updateTodo(todo: Todo): Observable<any> {
    return this.http.put(this.url + `/${todo.id}`, todo);
  }
}
