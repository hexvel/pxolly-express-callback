export interface IReplyMessage {
    date: number;
    conversation_message_id?: number;
    from_id?: number;
    text?: string;
    has_attachment?: number;
}

export interface IMessage {
    date: number;
    conversation_message_id?: number;
    from_id?: number;
    text?: string;
    has_attachment?: number;
    reply_message?: IReplyMessage;
}
