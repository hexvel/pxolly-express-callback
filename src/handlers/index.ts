import { ConfirmationHandler } from "./ConfirmationHandler.ts";
import { SyncHandler } from "./SyncHandler.ts";
import { BaseHandler } from "./BaseHandler.ts";

const handlers: BaseHandler[] = [new ConfirmationHandler(), new SyncHandler()];

export const eventHandlers: Record<string, BaseHandler> = handlers.reduce(
    (acc, handler) => {
        acc[handler.eventType] = handler;
        return acc;
    },
    {} as Record<string, BaseHandler>
);
