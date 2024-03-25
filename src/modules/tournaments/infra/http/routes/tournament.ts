import express from "express";

import { newTournamentCtrl } from "../../../usecase/newTournament";
import { middleware } from "../../../../../shared/infra/http";
import { paginateTournamentsController } from "../../../queries/paginateTournaments";
import { buildBracketCtrl } from "../../../usecase/buildTournamentBrackets";

const tournamentRouter = express.Router();

tournamentRouter.post("/", middleware.adminAuthenticated() as any, (req, res) =>
    newTournamentCtrl.execute(req, res)
);

tournamentRouter.get("/", (req, res) =>
    paginateTournamentsController.execute(req, res)
);

tournamentRouter.put("/brackets", (req, res) =>
    buildBracketCtrl.execute(req, res)
);

export { tournamentRouter };
