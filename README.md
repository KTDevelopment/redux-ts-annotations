# redux-ts-annotations

A simple extension for [redux-ts](https://github.com/cimdalli/redux-ts), to bind actions and props with annotations.

## Requirements

add "experimentalDecorators": true to your tsconfig:
 ```
 "compilerOptions": {
    "experimentalDecorators": true
 }
```

## Installation

install with npm 

 ```
 npm install redux-ts-annotations --save
```

or yarn 

 ```
 yarn add redux-ts-annotations
```

## Usage

setup your actions, reducers and store as normal with redux-ts

actions.ts
 ```
import {createAction} from "redux-ts";

export const AddTodo = createAction<AddTodoPayload>('AddTodo');

export interface AddTodoPayload {
    todo: string
}

export const RemoveTodo = createAction<RemoveTodoPayload>('RemoveTodo');

export interface RemoveTodoPayload {
    index: number
}
```

reducers.ts
 ```
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
```

store.ts
 ```
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
```

TodoComponent.tsx

 ```
import {Component} from 'react';
import * as React from 'react';
import {ConnectAction, ConnectProp, ConnectToStore, DispatchActionWithPayload} from "../src";
import {TodoState} from "./testState/reducers";
import {RootState, store} from "./testState/store";
import {AddTodo, AddTodoPayload, RemoveTodo, RemoveTodoPayload} from "./testState/actions";

class Props {
    @ConnectProp('testState') testState?: TodoState;
    @ConnectProp((state: RootState) => state.testState.todos) todos?: TodoState["todos"];
    @ConnectAction(AddTodo) addTodo?: DispatchActionWithPayload<AddTodoPayload>;
    @ConnectAction(RemoveTodo) removeTodo?: DispatchActionWithPayload<RemoveTodoPayload>;
}

@ConnectToStore(Props)
export class TodoComponent extends Component<Props> {

    render() {
        return (
            <React.Fragment>
                Hallo TestComponent
            </React.Fragment>
        );
    }
}
```