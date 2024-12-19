import { Response } from "express";
import { BaseHandler } from "./BaseHandler.ts";
import { IEvent } from "../types/event.ts";
import { VkApi } from "../utils/VkApi.ts";

export class SyncHandler extends BaseHandler {
    readonly eventType = "sync";

    async handle(
        event: IEvent,
        res: Response,
        vkApi: VkApi
    ): Promise<Response> {
        try {
            const message = event.object?.message;

            if (!message) {
                return res.status(400).json({ error: "Invalid event data" });
            }

            const { text, from_id, date, conversation_message_id } = message;

            // Я сделал эти проверки тупо для того чтобы редактор не доёбывал, а так они не нужны.
            if (!text || !from_id || !date || !conversation_message_id) {
                return res.status(400).json({
                    error: "Missing required message properties",
                });
            }

            const peer = await vkApi.searchPeer(
                text,
                from_id,
                date,
                conversation_message_id
            );
            return res.json({ ok: true, local_id: peer });
        } catch (error) {
            return this.handleError(error as Error, res);
        }
    }
}
