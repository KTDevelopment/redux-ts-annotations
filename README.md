# redux-ts-annotations [![Build Status](https://travis-ci.com/KTDevelopment/redux-ts-annotations.svg?branch=master)](https://travis-ci.com/KTDevelopment/redux-ts-annotations)

A simple extension for [redux-ts](https://github.com/cimdalli/redux-ts), to bind actions and props with annotations.

## Requirements

add "experimentalDecorators": true to your tsconfig:
 ```json
 "compilerOptions": {
    "experimentalDecorators": true
 }
```

## Installation

install with npm 

 ```bash
 npm install redux-ts-annotations --save
```

or yarn 

 ```bash
 yarn add redux-ts-annotations
```

## Usage

setup your actions, reducers and store as normal with redux-ts

actions.ts
 ```typescript
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
 ```typescript
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
 ```typescript
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

Than use annotations in your component.

TodoComponent.tsx

 ```typescript
import {Component} from 'react';
import * as React from 'react';
import {ConnectAction, ConnectProp, ConnectToStore, DispatchActionWithPayload} from "redux-ts-annotations";
import {TodoState} from "./reducers";
import {RootState, store} from "./store";
import {AddTodo, AddTodoPayload, RemoveTodo, RemoveTodoPayload} from "./actions";

class Props {
    @ConnectProp('todoState') todoState?: TodoState;
    @ConnectProp((state: RootState) => state.todoState.todos) todos?: TodoState["todos"];
    @ConnectAction(AddTodo) addTodo?: DispatchActionWithPayload<AddTodoPayload>;
    @ConnectAction(RemoveTodo) removeTodo?: DispatchActionWithPayload<RemoveTodoPayload>;
}

@ConnectToStore(Props)
export class TodoComponent extends Component<Props> {

    render() {
        return (
            <React.Fragment>
                Hello from TodoComponent
            </React.Fragment>
        );
    }
}
```