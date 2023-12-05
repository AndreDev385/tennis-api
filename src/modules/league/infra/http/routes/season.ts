import express from "express";
import { listSeasonController } from "../../../useCases/listSeasons";
import { createSeasonController } from "../../../useCases/createSeason";
import { middleware } from "../../../../../shared/infra/http";
import { finishSeasonController } from "../../../useCases/finishSeason";
import { resumeSeasonController } from "../../../useCases/resumeSeason";

const seasonRouter = express.Router();

seasonRouter.get("/", (req, res) =>
    listSeasonController.execute(req, res)
);

seasonRouter.post("/", middleware.adminAuthenticated() as any, (req, res) =>
    createSeasonController.execute(req, res)
);

seasonRouter.put("/finish", middleware.adminAuthenticated() as any, (req, res) =>
    finishSeasonController.execute(req, res)
);

seasonRouter.put(
    "/resume",
    middleware.adminAuthenticated() as any,
    (req, res) => resumeSeasonController.execute(req, res)
)

export { seasonRouter };
