import {createStore} from "@ngneat/elf";
import {selectAllEntities, setEntities, withEntities} from "@ngneat/elf-entities";
import {Injectable} from "@angular/core";
import {Todo} from "./todo";

const store = createStore(
    {name: 'todos'},
    withEntities<Todo>()
);

@Injectable({providedIn: 'root'})
export class TodosRepository {
    todos$ = store.pipe(selectAllEntities());

    setTodos(todos: Todo[]) {
        store.update(setEntities(todos));
    }
}