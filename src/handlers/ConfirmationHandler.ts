import { BaseHandler } from "./BaseHandler";
import { IEvent } from "@/types/event";
import { Response } from "express";

export class ConfirmationHandler extends BaseHandler {
    readonly eventType = "confirmation";

    handle(event: IEvent, res: Response): Response {
        try {
            return res.json({ ok: true });
        } catch (error) {
            return this.handleError(error as Error, res);
        }
    }
}
