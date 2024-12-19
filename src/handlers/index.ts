import { ConfirmationHandler } from "./ConfirmationHandler.ts";
import { SyncHandler } from "./SyncHandler.ts";
import { SetThemeHandler } from "./setTheme.ts";
import { BaseHandler } from "./BaseHandler.ts";
import { InviteUserHandler } from "./InviteUser.ts";
import { ResetThemeHandler } from "./resetTheme.ts";
import { DeleteForAllHandler } from "./deleteForAll.ts";
import { ChatPhotoUpdateHandler } from "./ChatPhotoUpdate.ts";

const handlers: BaseHandler[] = [
    new ConfirmationHandler(),
    new SyncHandler(),
    new InviteUserHandler(),
    new SetThemeHandler(),
    new ResetThemeHandler(),
    new DeleteForAllHandler(),
    new ChatPhotoUpdateHandler(),
];

export const eventHandlers: Record<string, BaseHandler> = handlers.reduce(
    (acc, handler) => {
        acc[handler.eventType] = handler;
        return acc;
    },
    {} as Record<string, BaseHandler>
);
