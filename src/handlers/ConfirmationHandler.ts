import { BaseHandler } from "./BaseHandler.ts";
import { IEvent } from "../types/event.ts";
import process from "process";
import { Response } from "express";
import { VkApi } from "../utils/VkApi.ts";

interface ICodeResponse {
    response: { code: string };
}

export class ConfirmationHandler extends BaseHandler {
    readonly eventType = "confirmation";

    private getAccessToken(): string {
        const token = process.env.PXOLLY_ACCESS_TOKEN;
        if (!token) {
            throw new Error(
                "PXOLLY_ACCESS_TOKEN is not set in environment variables"
            );
        }
        return token;
    }

    private createRequestParams(): URLSearchParams {
        const params = new URLSearchParams();
        params.append("access_token", this.getAccessToken());
        return params;
    }

    private async fetchConfirmationCode(vkApi: VkApi): Promise<string> {
        const params = this.createRequestParams();
        const { data } = await vkApi.httpClient.postToUrl<ICodeResponse>(
            "https://api.pxolly.ru/m/callback.getConfirmationCode",
            params,
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );
        return data.response.code;
    }

    async handle(_: IEvent, res: Response, vkApi: VkApi): Promise<Response> {
        try {
            const code = await this.fetchConfirmationCode(vkApi);
            return res.status(200).json({ ok: true, code });
        } catch (error) {
            console.error("Error fetching confirmation code:", error);
            return this.handleError(error as Error, res);
        }
    }
}
