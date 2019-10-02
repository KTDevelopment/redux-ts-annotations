import {ReducerBuilder} from "redux-ts";
import {AddTodo, RemoveTodo} from "./actions";

export interface TodoState {
    todos: string[]
}

export const todoReducer = new ReducerBuilder<TodoState>()
    .init({
        todos: []
    })
    .handle(AddTodo, (state, action, dispatch) => {
        let current = state.todos;
        current.push(action.payload.todo);
        return {
            ...state,
            todos: current
        };
    })
    .handle(RemoveTodo, (state, action, dispatch) => {
        return {
            ...state,
            todos: state.todos.splice(action.payload.index, 1)
        };
    });