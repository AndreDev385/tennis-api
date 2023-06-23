import express from "express";
import { createPlayerController } from "../../../useCases/createPlayer";
import { middleware } from "../../../../../shared/infra/http";

const playerRoute = express.Router();

playerRoute.post("/", middleware.ensureAuthenticated(), (req, res) =>
    createPlayerController.execute(req, res)
);

export { playerRoute };
