import express from "express";

import { newTournamentCtrl } from "../../../usecase/newTournament";
import { middleware } from "../../../../../shared/infra/http";
import { paginateTournamentsController } from "../../../queries/paginateTournaments";
import { addContestParticipantsCtrl } from "../../../usecase/addContestParticipants";
import { addTournamentContestCtrl } from "../../../usecase/addTournamentContest";
import { buildBracketCtrl } from "../../../usecase/buildContestBrackets";
import { listContestCtrl } from "../../../queries/listContest";
import { getContestCtrl } from "../../../queries/getContest";
import { listContestBracketsCtrl } from "../../../queries/listContestBrackets";
import { addContestCouplesCtrl } from "../../../usecase/addContestCouples";
import { paginateMatchesCtrl } from "../../../queries/paginateMatches";
import { createBracketMatchCtrl } from "../../../usecase/createBracketMatch";
import { updateTournamentMatchCtrl } from "../../../usecase/updateMatch";
import { getTournamentMatchCtrl } from "../../../queries/getMatch";
import { Tournament } from "../../../domain/tournament";
import { deleteBracketsCtrl } from "../../../usecase/deleteBrackets";

const tournamentRouter = express.Router();

tournamentRouter.post(
    "/",
    middleware.adminAuthenticated() as any,
    middleware.uploadImageHandler.single("image"),
    (req, res) => newTournamentCtrl.execute(req, res)
);

tournamentRouter.get("/", (req, res) =>
    paginateTournamentsController.execute(req, res)
);

// matches
tournamentRouter.get("/matches-pagination", (req, res) =>
    paginateMatchesCtrl.execute(req, res)
);

tournamentRouter.put("/match", (req, res) =>
    updateTournamentMatchCtrl.execute(req, res)
);

tournamentRouter.get("/match", (req, res) =>
    getTournamentMatchCtrl.execute(req, res)
);
// end matches

tournamentRouter.put("/brackets", (req, res) =>
    buildBracketCtrl.execute(req, res)
);

tournamentRouter.get("/contest", (req, res) =>
    listContestCtrl.execute(req, res)
);

tournamentRouter.get("/brackets/:contestId", (req, res) =>
    listContestBracketsCtrl.execute(req, res)
);

tournamentRouter.put("/create-bracket-match", (req, res) =>
    createBracketMatchCtrl.execute(req, res)
);

//TODO: just for admin
tournamentRouter.delete("/brackets", (req, res) =>
    deleteBracketsCtrl.execute(req, res)
);

tournamentRouter.get("/contest/:contestId", (req, res) =>
    getContestCtrl.execute(req, res)
);

tournamentRouter.post("/contest", (req, res) =>
    addTournamentContestCtrl.execute(req, res)
);

tournamentRouter.put("/add-contest-participants", (req, res) =>
    addContestParticipantsCtrl.execute(req, res)
);

tournamentRouter.put("/add-contest-couples", (req, res) =>
    addContestCouplesCtrl.execute(req, res)
);

export { tournamentRouter };
