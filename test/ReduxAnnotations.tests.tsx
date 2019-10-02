import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {StoreTestComponent, TodoComponent} from "./TodoComponent";

describe('Annotations Tests', () => {
    it('connects props and actions correct', () => {
        const props = renderer
            .create(<StoreTestComponent/>)
            .root
            .findByType(TodoComponent)
            .children[0]
            // @ts-ignore
            .props;

        expect(props.todoState).toEqual({ todos: [ 'do this first', 'do this second' ] });
        expect(props.todos).toEqual([ 'do this first', 'do this second' ]);
        expect(typeof props.addTodo).toEqual('function');
        expect(typeof props.removeTodo).toEqual('function');

        props.addTodo({todo: 'foo ToDo'});
        expect(props.todos).toEqual([ 'do this first', 'do this second', "foo ToDo"]);

        props.removeTodo({index: 0});
        expect(props.todos).toEqual([ 'do this second', "foo ToDo"]);
    });
});