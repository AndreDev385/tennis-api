import express from "express";
import { updateTournamentMatchCtrl } from "../../../usecase/updateMatch";
import { paginateMatchesCtrl } from "../../../queries/paginateMatches";
import { getTournamentMatchCtrl } from "../../../queries/getMatch";
import { createBracketMatchCtrl } from "../../../usecase/createBracketMatch";
import { createClashMatchesCtrl } from "../../../usecase/createClashMatches";

export const tournamentMatchRouter = express.Router();

// matches
tournamentMatchRouter.get("/pagination", (req, res) =>
    paginateMatchesCtrl.execute(req, res)
);

tournamentMatchRouter.put("/", (req, res) =>
    updateTournamentMatchCtrl.execute(req, res)
);

tournamentMatchRouter.get("/", (req, res) =>
    getTournamentMatchCtrl.execute(req, res)
);

tournamentMatchRouter.put("/create-bracket-match", (req, res) =>
    createBracketMatchCtrl.execute(req, res)
);

tournamentMatchRouter.put("/create-clash-matches", (req, res) =>
    createClashMatchesCtrl.execute(req, res)
);
// end matches
