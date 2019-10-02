import {ReducerBuilder} from "redux-ts";
import {AddTodo, RemoveTodo} from "./testActions";

export interface TestState {
    todos: string[]
}

export const testReducer = new ReducerBuilder<TestState>()
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