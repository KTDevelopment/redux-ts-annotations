import {Component} from 'react';
import * as React from 'react';
import {ConnectAction, ConnectProp, ConnectToStore, DispatchActionWithPayload} from "../src";
import {AddTodo, AddTodoPayload, RemoveTodo} from "./testState/testActions";
import {TestState} from "./testState/testReducer";
import {Provider} from "react-redux";
import {RootState, store} from "./testState";


class Props {
    @ConnectProp('testState') testState?: TestState;
    @ConnectProp((state: RootState) => state.testState.todos) todos?: TestState["todos"];
    @ConnectAction(AddTodo) addTodo?: DispatchActionWithPayload<AddTodoPayload>;
    @ConnectAction(RemoveTodo) removeTodo?: DispatchActionWithPayload<AddTodoPayload>;
}

@ConnectToStore(Props)
export class TestComponent extends Component<Props> {

    render() {
        return (
            <React.Fragment>
                Hallo TestComponent
            </React.Fragment>
        );
    }
}

export class StoreTestComponent extends Component {

    render() {
        return (
            <Provider store={store}>
                <TestComponent/>
            </Provider>
        );
    }
}