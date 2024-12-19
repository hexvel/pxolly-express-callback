import { Response } from "express";
import { BaseHandler } from "./BaseHandler";
import { IEvent } from "@/types/event";

export class SyncHandler extends BaseHandler {
    readonly eventType = "sync";

    handle(event: IEvent, res: Response): Response {
        this.log(event);
        try {
            // мдээээ
            return res.json({ ok: true });
        } catch (error) {
            return this.handleError(error as Error, res);
        }
    }
}
