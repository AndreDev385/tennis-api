import express from "express";
import { middleware } from "../../../../../shared/infra/http";

import { createPlayerController } from "../../../useCases/createPlayer";
import { getPlayerByUserIdController } from "../../../useCases/getPlayerByUserId";
import { listPlayersController } from "../../../useCases/listPlayers";
import { getPlayerStatsController } from "../../../useCases/getPlayerStats";

const playerRoute = express.Router();

playerRoute.post("/", middleware.ensureAuthenticated(), (req, res) =>
    createPlayerController.execute(req, res)
);

playerRoute.get("/", middleware.ensureAuthenticated(), (req, res) =>
    listPlayersController.execute(req, res)
);

playerRoute.get("/me", middleware.ensureAuthenticated(), (req, res) =>
    getPlayerByUserIdController.execute(req, res)
);

playerRoute.get('/stats', middleware.ensureAuthenticated(), (req, res) => getPlayerStatsController.execute(req, res))

export { playerRoute };
