import express, { Express, Request, Response } from "express";
import { eventHandlers } from "./handlers/index.ts";
import dotenv from "dotenv";
import process from "process";

import { IEvent } from "./types/event.ts";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// @ts-ignore: Unreachable code error
app.post("/callback", async (req: Request, res: Response) => {
    const event: IEvent = req.body as IEvent;
    const handler = eventHandlers[event.type];

    if (!handler) {
        console.error(`Handler for event type ${event.type} not found`);
        res.sendStatus(400);
        return;
    }

    try {
        return await handler.handle(event, res);
    } catch (error) {
        console.error(`Error processing event of type: ${event.type}`, error);
        res.status(500).send("Internal server error");
    }
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
