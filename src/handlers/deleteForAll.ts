import { Response } from "express";
import { BaseHandler } from "./BaseHandler.ts";
import { IEvent } from "../types/event.ts";
import { VkApi } from "../utils/VkApi.ts";

export class DeleteForAllHandler extends BaseHandler {
    readonly eventType = "delete_for_all";

    async handle(
        event: IEvent,
        res: Response,
        vkApi: VkApi
    ): Promise<Response> {
        try {
            const conversations = [];

            const deleted = await vkApi.callMethod("messages.delete", {
                peer_id: event.object?.chat_local_id! + 2000000000,
                cmids: event.object?.conversation_message_ids,
                delete_for_all: 1,
            });

            for (const message of deleted.response) {
                conversations.push(message.conversation_message_id);
            }

            return res.json({
                ok: true,
                conversation_message_ids: conversations,
            });
        } catch (error) {
            return this.handleError(error as Error, res);
        }
    }
}
