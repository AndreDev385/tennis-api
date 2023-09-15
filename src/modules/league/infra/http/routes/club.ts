import express from "express";
import { listClubController } from "../../../useCases/listClubs";
import { middleware } from "../../../../../shared/infra/http";
import { createClubController } from "../../../useCases/createClub";

const clubRouter = express.Router();

clubRouter.get("/", (req, res) => listClubController.execute(req, res));

clubRouter.post(
    "/",
    middleware.adminAuthenticated(),
    (req, res) => createClubController.execute(req, res)
);

export { clubRouter };
