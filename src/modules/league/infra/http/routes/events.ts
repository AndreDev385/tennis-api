import express from "express";
import { middleware } from "../../../../../shared/infra/http";
import { createClubEventController } from "../../../useCases/createClubEvent";
import { listClubEventsController } from "../../../useCases/listClubEvents";
import { deleteEventController } from "../../../useCases/deleteEvent";

const eventRouter = express.Router();

eventRouter.get("/", (req, res) => listClubEventsController.execute(req, res))

eventRouter.post(
    "/",
    middleware.adminAuthenticated() as any,
    middleware.uploadImageHandler.single("image"),
    (req, res) => createClubEventController.execute(req, res)
);

eventRouter.delete("/:eventId",
    middleware.adminAuthenticated() as any,
    (req, res) => deleteEventController.execute(req, res)
)

export { eventRouter };
