import {Action, Selector, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {TodosService} from "../services/todos.service";
import {AddTodo, EditTodo, LoadTodos, RemoveTodo} from "./todos.actions";
import {tap} from "rxjs";
import {Todo} from "./todo";

@State<Todo[]>({
    name: 'todos',
    defaults: []
})
@Injectable()
export class TodosState {

    constructor(private todosService: TodosService) {
    }

    @Selector()
    static todos(state: Todo[]) {
        return state;
    }

    @Action(LoadTodos)
    loadTodos(ctx: StateContext<Todo[]>) {
        return this.todosService.getTodos().pipe(
            tap(todos => {
                const state = ctx.getState();
                ctx.setState(todos);
            })
        );
    }

    @Action(AddTodo)
    addTodo(ctx: StateContext<Todo[]>, action: AddTodo) {
        return this.todosService.addTodo({task: action.task}).pipe(
            tap(() => ctx.dispatch(new LoadTodos()))
        );
    }

    @Action(EditTodo)
    editTodo(ctx: StateContext<Todo[]>, action: EditTodo) {
        return this.todosService.updateTodo(action.todo).pipe(
            tap(() => ctx.dispatch(new LoadTodos()))
        );
    }

    @Action(RemoveTodo)
    removeTodo(ctx: StateContext<Todo[]>, action: RemoveTodo) {
        return this.todosService.removeTodo(action.id).pipe(
            tap(() => ctx.dispatch(new LoadTodos()))
        );
    }
}