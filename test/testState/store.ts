import {StoreBuilder} from "redux-ts";
import {todoReducer, TodoState} from "./reducers";

export interface RootState {
    testState: TodoState
}

export const store = new StoreBuilder<RootState>()
    .withInitialState({
        testState: {
            todos: ['do this first', 'do this second']
        }
    })
    .withReducerBuilder('testState', todoReducer)
    .build();