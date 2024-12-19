import { Response } from "express";
import { BaseHandler } from "./BaseHandler.ts";
import { IEvent } from "../types/event.ts";
import { VkApi } from "../utils/VkApi.ts";
import FormData from "form-data";
import { Buffer } from "node:buffer";

export class ChatPhotoUpdateHandler extends BaseHandler {
    readonly eventType = "chat_photo_update";

    private async getChatUploadUrl(
        event: IEvent,
        vkApi: VkApi
    ): Promise<string> {
        const response = await vkApi.callMethod("photos.getChatUploadServer", {
            chat_id: event.object?.chat_local_id,
        });
        return response.response.upload_url;
    }

    private async fetchPhotoData(event: IEvent, vkApi: VkApi): Promise<Buffer> {
        const photoResponse = await vkApi.httpClient.getFromUrl(
            event.object?.photo_url!,
            {
                responseType: "arraybuffer",
            }
        );
        return photoResponse.data as Buffer;
    }

    private async uploadPhoto(
        uploadUrl: string,
        photoData: Buffer,
        vkApi: VkApi
    ): Promise<{ response: string }> {
        const formData = new FormData();
        formData.append("file", photoData, { filename: "photo.jpg" });

        const response = await vkApi.httpClient.postToUrl<{ response: string }>(
            uploadUrl,
            formData,
            {
                headers: { ...formData.getHeaders() },
            }
        );

        return response.data;
    }

    async handle(
        event: IEvent,
        res: Response,
        vkApi: VkApi
    ): Promise<Response> {
        try {
            const uploadUrl = await this.getChatUploadUrl(event, vkApi);
            const photoData = await this.fetchPhotoData(event, vkApi);
            const uploadResponse = await this.uploadPhoto(
                uploadUrl,
                photoData,
                vkApi
            );

            await vkApi.callMethod("messages.setChatPhoto", {
                file: uploadResponse.response,
            });

            return res.json({ ok: true });
        } catch (error) {
            return this.handleError(error as Error, res);
        }
    }
}
