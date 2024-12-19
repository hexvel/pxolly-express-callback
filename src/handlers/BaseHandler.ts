import { IEvent } from "../types/event.ts";
import { Response } from "express";

export abstract class BaseHandler {
    abstract readonly eventType: string;

    abstract handle(event: IEvent, res: Response): Promise<Response>;

    protected handleError(error: Error, res: Response): Response {
        return res.status(500).json({ ok: false, error: error.message });
    }
}
