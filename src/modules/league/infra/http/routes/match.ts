import express from "express";
import { middleware } from "../../../../../shared/infra/http";
import { createMatchController } from "../../../useCases/createMatch";
import { listMatchsController } from "../../../useCases/listMatchs";
import { goMatchLiveController } from "../../../useCases/goMatchLive";
import { getMatchByIdController } from "../../../useCases/getMatchById";
import { finishMatchController } from "../../../useCases/finishMatch";
import { pauseMatchController } from "../../../useCases/pauseMatch";

const matchRouter = express.Router();

matchRouter.post("/", middleware.ensureAuthenticated(), (req, res) =>
    createMatchController.execute(req, res)
);

matchRouter.get("/", (req, res) => listMatchsController.execute(req, res));

matchRouter.get("/:matchId", (req, res) =>
    getMatchByIdController.execute(req, res)
);

matchRouter.put("/go-live", (req, res) =>
    goMatchLiveController.execute(req, res)
);

matchRouter.put("/pause", (req, res) =>
    pauseMatchController.execute(req, res)
);

matchRouter.put("/finish", (req, res) =>
    finishMatchController.execute(req, res)
);

export { matchRouter };
