import {ActionCreatorDefinition, mapDispatchToProps} from "redux-ts";
import {addMappingToMetadata} from "./helper";

export type DispatchAction = () => any;
export type DispatchActionWithPayload<TPayload> = (payload: TPayload) => any;

interface ActionCreatorDefinitionMapping {
    actionCreatorKey: string;
    actionCreatorDefinition: ActionCreatorDefinition<any, any>
}

const connectActionKey = Symbol("connectActionKey2");
export function ConnectAction(actionCreator: ActionCreatorDefinition<any, any>) {
    return <any>function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        addMappingToMetadata(
            {
                actionCreatorDefinition: actionCreator,
                actionCreatorKey: propertyKey
            },
            target,
            connectActionKey
        );
    };
}

export function exportMapDispatcher(propType: { new(): any }) {
    return mapDispatchToProps(
        buildObjectFromActionCreatorDefinition(
            Reflect.getOwnMetadata(
                connectActionKey, Object.getPrototypeOf(new propType())
            ) || [])
    )
}

function buildObjectFromActionCreatorDefinition(actionCreatorDefinitionMappings: ActionCreatorDefinitionMapping[]) {
    let props = {};
    for (const actionCreatorDefinitionMapping of actionCreatorDefinitionMappings) {
        props[actionCreatorDefinitionMapping.actionCreatorKey] = actionCreatorDefinitionMapping.actionCreatorDefinition
    }
    return props;
}
