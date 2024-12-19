import { IObject } from "./object";

export interface IEvent {
    type: string;
    object?: IObject;
    user_id?: number;
    from_id?: number;
    event_id?: string;
}
