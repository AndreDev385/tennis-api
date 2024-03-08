import express from "express";
import { newTournamentCtrl } from "../../../usecase/newTournament";
import { middleware } from "../../../../../shared/infra/http";

const tournamentRouter = express.Router();

tournamentRouter.post("/", middleware.adminAuthenticated() as any, (req, res) =>
    newTournamentCtrl.execute(req, res)
);

export { tournamentRouter };
