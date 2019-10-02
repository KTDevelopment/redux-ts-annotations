import {addMappingToMetadata} from "./helper";

interface PropMapping {
    propertyKey: string;
    propKeyOrModifier: string | StateModifier
}

type StateModifier = (state: any) => any

const connectPropKey = Symbol("connectPropKey2");

export function ConnectProp(propKeyOrModifier: string | StateModifier) {
    return <any>function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        addMappingToMetadata({propertyKey, propKeyOrModifier}, target, connectPropKey);
    };
}

export function exportMapState(propType: { new(): any }) {
    let propMappings: PropMapping[] = Reflect.getOwnMetadata(connectPropKey, Object.getPrototypeOf(new propType())) || [];
    return (state, ownProps) => {
        let props = {};
        for (let propMapping of propMappings) {
            let prop;

            if (typeof propMapping.propKeyOrModifier === "string") {
                prop = state[propMapping.propKeyOrModifier];
            } else {
                prop = propMapping.propKeyOrModifier(state)
            }

            props[propMapping.propertyKey] = prop;

        }
        return props;
    };
}