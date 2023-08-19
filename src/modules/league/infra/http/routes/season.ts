import express from "express";
import { listSeasonController } from "../../../useCases/listSeasons";
import { createSeasonController } from "../../../useCases/createSeason";
import { middleware } from "../../../../../shared/infra/http";
import { finishSeasonController } from "../../../useCases/finishSeason";

const seasonRouter = express.Router();

seasonRouter.get("/", (req, res) =>
    listSeasonController.execute(req, res)
);

seasonRouter.post("/", middleware.adminAuthenticated(), (req, res) =>
    createSeasonController.execute(req, res)
);

seasonRouter.put("/finish", middleware.adminAuthenticated(), (req, res) =>
    finishSeasonController.execute(req, res)
);

export { seasonRouter };
