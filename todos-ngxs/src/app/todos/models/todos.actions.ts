import {Todo} from "./todo";

export class LoadTodos {
    static readonly type = '[Todos] Load';
    constructor() {}
}

export class AddTodo {
    static readonly type = '[Todos] Add';
    constructor(public task: string) {}
}

export class EditTodo {
    static readonly type = '[Todos] Edit';
    constructor(public todo: Todo) {}
}

export class RemoveTodo {
    static readonly type = '[Todos] Remove';
    constructor(public id: number) {}
}