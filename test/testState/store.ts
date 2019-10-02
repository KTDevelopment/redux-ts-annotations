import {StoreBuilder} from "redux-ts";
import {todoReducer, TodoState} from "./reducers";

export interface RootState {
    todoState: TodoState
}

export const store = new StoreBuilder<RootState>()
    .withInitialState({
        todoState: {
            todos: ['do this first', 'do this second']
        }
    })
    .withReducerBuilder('todoState', todoReducer)
    .build();