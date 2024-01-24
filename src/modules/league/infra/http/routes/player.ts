import express from "express";
import { middleware } from "../../../../../shared/infra/http";

import { createPlayerController } from "../../../useCases/createPlayer";
import { getPlayerByUserIdController } from "../../../useCases/getPlayerByUserId";
import { listPlayersController } from "../../../useCases/listPlayers";
import {
    getPlayerStatsByUserIdController,
    getPlayerStatsController,
} from "../../../useCases/getPlayerStats";
import {
    registerPlayerBulkController,
    registerPlayerController,
} from "../../../../users/useCases/registerPlayerFromAdmin";

const playerRoute = express.Router();

playerRoute.post("/", middleware.ensureAuthenticated() as any, (req, res) =>
    createPlayerController.execute(req, res)
);

playerRoute.post(
    "/register",
    middleware.adminAuthenticated() as any,
    (req, res) => registerPlayerController.execute(req, res)
);

playerRoute.post(
    "/register-bulk",
    middleware.adminAuthenticated() as any,
    (req, res) => registerPlayerBulkController.execute(req, res)
);

playerRoute.get("/", middleware.ensureAuthenticated() as any, (req, res) =>
    listPlayersController.execute(req, res)
);

playerRoute.get("/me", middleware.ensureAuthenticated() as any, (req, res) =>
    getPlayerByUserIdController.execute(req, res)
);

playerRoute.get("/stats", middleware.ensureAuthenticated() as any, (req, res) =>
    getPlayerStatsController.execute(req, res)
);

playerRoute.get(
    "/stats-by-userid/:userId",
    middleware.ensureAuthenticated() as any,
    (req, res) => getPlayerStatsByUserIdController.execute(req, res)
);

export { playerRoute };
