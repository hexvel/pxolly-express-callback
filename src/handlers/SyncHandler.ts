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
            const peer = await vkApi.searchPeer(
                event.object?.message?.text || "",
                event.object?.message?.from_id || 0,
                event.object?.message?.date || 0,
                event.object?.message?.conversation_message_id || 0
            );
            return res.json({ ok: true, local_id: peer });
        } catch (error) {
            return this.handleError(error as Error, res);
        }
    }
}
