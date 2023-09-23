import express from "express";
import { middleware } from "../../../../../shared/infra/http";
import { createClubEventController } from "../../../useCases/createClubEvent";
import { listClubEventsController } from "../../../useCases/listClubEvents";
import { deleteEventController } from "../../../useCases/deleteEvent";

const eventRouter = express.Router();

eventRouter.get("/", (req, res) => listClubEventsController.execute(req, res))

eventRouter.post(
    "/",
    middleware.adminAuthenticated(),
    middleware.uploadImageHandler.single("image"),
    (req, res) => createClubEventController.execute(req, res)
);

eventRouter.delete("/:eventId",
    middleware.adminAuthenticated(),
    (req, res) => deleteEventController.execute(req, res)
)

export { eventRouter };
