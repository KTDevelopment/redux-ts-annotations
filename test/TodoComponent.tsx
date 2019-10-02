import {Component} from 'react';
import * as React from 'react';
import {ConnectAction, ConnectProp, ConnectToStore, DispatchActionWithPayload} from "../src";
import {Provider} from "react-redux";
import {TodoState} from "./testState/reducers";
import {RootState, store} from "./testState/store";
import {AddTodo, AddTodoPayload, RemoveTodo, RemoveTodoPayload} from "./testState/actions";

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

export class StoreTestComponent extends Component {

    render() {
        return (
            <Provider store={store}>
                <TodoComponent/>
            </Provider>
        );
    }
}