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
import { addPlayerDeviceController } from "../../../useCases/addPlayerDevice";
import { deletePlayerController } from "../../../useCases/deletePlayer";
import { changePlayerClubController } from "../../../useCases/changePlayerClub";

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

playerRoute.get("/", middleware.adminAuthenticated() as any, (req, res) =>
    listPlayersController.execute(req, res)
);

playerRoute.get("/me", middleware.ensureAuthenticated() as any, (req, res) =>
    getPlayerByUserIdController.execute(req, res)
);

playerRoute.get("/stats", middleware.ensureAuthenticated() as any, (req, res) =>
    getPlayerStatsController.execute(req, res)
);

playerRoute.put(
    "/device",
    middleware.ensureAuthenticated() as any,
    (req, res) => addPlayerDeviceController.execute(req, res)
);

playerRoute.get(
    "/stats-by-userid/:userId",
    middleware.ensureAuthenticated() as any,
    (req, res) => getPlayerStatsByUserIdController.execute(req, res)
);

playerRoute.delete(
    "/:playerId",
    middleware.adminAuthenticated() as any,
    (req, res) => deletePlayerController.execute(req, res)
);

playerRoute.put(
    "/change-club",
    middleware.adminAuthenticated() as any,
    (req, res) => changePlayerClubController.execute(req, res)
);

export { playerRoute };
