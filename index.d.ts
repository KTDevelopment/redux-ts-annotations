// Type definitions for redux-ts-annotations
// Project: redux-ts-annotations
// Definitions by: Kevin Thürmann <kevin.thuermann@web.de>

/*~ If this module has methods, declare them as functions like so.
 */

import {ActionCreatorDefinition} from "redux-ts";

export function ConnectProp(propKeyOrModifier: string | StateModifier)
export function ConnectToStore(propType: { new(): any })
export function connectToStore(propType: { new(): any }, compType: any)
export function ConnectAction(actionCreator: ActionCreatorDefinition<any, any>)

type StateModifier = (state: any) => any
type DispatchAction = () => any;
type DispatchActionWithPayload<TPayload> = (payload: TPayload) => any;