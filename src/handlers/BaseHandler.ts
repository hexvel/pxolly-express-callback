import { IEvent } from "@/types/event";
import { Response } from "express";

export abstract class BaseHandler {
    abstract readonly eventType: string;

    abstract handle(event: IEvent, res: Response): Response;

    log(event: IEvent): void {
        console.log(`Handling event of type: ${this.eventType}`, event);
    }

    protected handleError(error: Error, res: Response): Response {
        return res.status(500).json({ ok: false, error: error.message });
    }
}
