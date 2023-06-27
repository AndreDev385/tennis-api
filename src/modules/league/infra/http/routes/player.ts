import express from "express";
import { middleware } from "../../../../../shared/infra/http";

import { createPlayerController } from "../../../useCases/createPlayer";
import { getPlayerByUserIdController } from "../../../useCases/getPlayerByUserId";
import { listPlayersController } from "../../../useCases/listPlayers";

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

export { playerRoute };
