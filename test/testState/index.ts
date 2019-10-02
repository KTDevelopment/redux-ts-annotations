import {StoreBuilder} from "redux-ts";
import {testReducer, TestState} from "./testReducer";

export interface RootState {
    testState: TestState
}

export const store = new StoreBuilder<RootState>()
    .withInitialState({
        testState: {
            todos: ['do this first', 'do this second']
        }
    })
    .withReducerBuilder('testState', testReducer)
    .build();



