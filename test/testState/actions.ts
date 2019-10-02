import {createAction} from "redux-ts";

export const AddTodo = createAction<AddTodoPayload>('AddTodo');

export interface AddTodoPayload {
    todo: string
}

export const RemoveTodo = createAction<RemoveTodoPayload>('RemoveTodo');

export interface RemoveTodoPayload {
    index: number
}