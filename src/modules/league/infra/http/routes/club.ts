import express from "express";
import { listClubController } from "../../../useCases/listClubs";
import { middleware } from "../../../../../shared/infra/http";
import { createClubController } from "../../../useCases/createClub";
import { subscribeClubController } from "../../../useCases/subscribeClub/indedx";
import { sendClubNotificationsController } from "../../../useCases/sendNotifications";
import { unsubscribeClubController } from "../../../useCases/unsubscribeClub";

const clubRouter = express.Router();

clubRouter.get("/", (req, res) => listClubController.execute(req, res));

clubRouter.post(
    "/",
    middleware.adminAuthenticated() as any,
    (req, res) => createClubController.execute(req, res)
);

clubRouter.put(
    "/subscribe/:clubId",
    middleware.adminAuthenticated() as any,
    (req, res) => subscribeClubController.execute(req, res)
)

clubRouter.put(
    "/unsubscribe/:clubId",
    middleware.adminAuthenticated() as any,
    (req, res) => unsubscribeClubController.execute(req, res)
)

clubRouter.post(
    "/send-notification",
    middleware.adminAuthenticated() as any,
    (req, res) => sendClubNotificationsController.execute(req, res)
)

export { clubRouter };
