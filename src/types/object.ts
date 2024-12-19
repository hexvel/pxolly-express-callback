import { IMessage } from "./message.ts";
import { IUser } from "./user.ts";

export interface IObject {
    date?: number;
    chat_local_id?: number;
    from_id?: number;
    user_id?: number;
    is_expired?: number;
    chat_uid?: number;
    prefix?: string;
    chat_id?: number;
    owner_id?: number;
    user?: IUser;
    message?: IMessage;
    conversation_message_ids?: number[];
    photo_url?: string;
    is_remove?: number;
    payload?: string;
    style?: string;
    bot_prefix?: string;
}
