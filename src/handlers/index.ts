import { ConfirmationHandler } from "./ConfirmationHandler";
import { SyncHandler } from "./SyncHandler";
import { BaseHandler } from "./BaseHandler";

const handlers: BaseHandler[] = [new ConfirmationHandler(), new SyncHandler()];

export const eventHandlers: Record<string, BaseHandler> = handlers.reduce(
    (acc, handler) => {
        acc[handler.eventType] = handler;
        return acc;
    },
    {} as Record<string, BaseHandler>
);
