import { BaseHandler } from "./BaseHandler.ts";
import { IEvent } from "../types/event.ts";
import { Response } from "express";
import { VkApi } from "../utils/VkApi.ts";

export class InviteUserHandler extends BaseHandler {
    readonly eventType = "invite_user";

    async inviteUser(event: IEvent, vkApi: VkApi) {
        await vkApi.callMethod("messages.addChatUser", {
            chat_id: event.object?.chat_local_id,
            user_id: event.object?.user_id,
        });
    }

    async handle(
        event: IEvent,
        res: Response,
        vkApi: VkApi
    ): Promise<Response> {
        try {
            await this.inviteUser(event, vkApi);
            if (event.object?.is_expired == 1) {
                const { response } = await vkApi.callMethod("users.get", {
                    user_ids: event.object?.user_id,
                });

                await vkApi.sendMessage(
                    event.object?.chat_local_id!,
                    `Пользователь ${response[0].first_name} ${response[0].last_name} не принял приглашение вовремя`
                );
            }
            return res.status(200).json({ ok: true });
        } catch (error) {
            console.error("Error invite user:", error);
            return this.handleError(error as Error, res);
        }
    }
}
