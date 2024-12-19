import { Response } from "express";
import { BaseHandler } from "./BaseHandler.ts";
import { IEvent } from "../types/event.ts";
import { VkApi } from "../utils/VkApi.ts";

export class SetThemeHandler extends BaseHandler {
    readonly eventType = "set_theme";

    async handle(
        event: IEvent,
        res: Response,
        vkApi: VkApi
    ): Promise<Response> {
        try {
            await vkApi.callMethod("messages.setConversationStyle", {
                peer_id: event.object?.chat_local_id! + 2000000000,
                style: event.object?.style,
            });
            return res.json({ ok: true });
        } catch (error) {
            return this.handleError(error as Error, res);
        }
    }
}
