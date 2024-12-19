import { Response } from "express";
import { BaseHandler } from "./BaseHandler.ts";
import { IEvent } from "../types/event.ts";

export class SyncHandler extends BaseHandler {
    readonly eventType = "sync";

    async handle(_: IEvent, res: Response): Promise<Response> {
        try {
            // мдээээ
            return res.json({ ok: true });
        } catch (error) {
            return this.handleError(error as Error, res);
        }
    }
}
