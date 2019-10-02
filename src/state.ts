import {connect} from "react-redux";
import {exportMapDispatcher} from "./actions";
import {exportMapState} from "./props";

export function ConnectToStore(propType: { new(): any }): Function {
    return function (target: Function) {
        return connectToStore(propType, target);
    };
}

export function connectToStore(propType: { new(): any }, compType: any) {
    return connect(
        exportMapState(propType),
        exportMapDispatcher(propType)
    )(compType);
}