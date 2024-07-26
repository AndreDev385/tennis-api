import express from "express";
import { listContestCtrl } from "../../../queries/listContest";
import { addTournamentContestCtrl } from "../../../usecase/addTournamentContest";
import { addContestParticipantsCtrl } from "../../../usecase/addContestParticipants";
import { addContestCouplesCtrl } from "../../../usecase/addContestCouples";
import { addContestTeamsCtrl } from "../../../usecase/addContestTeams";
import { listContestTeamsCtrl } from "../../../queries/listContestTeams";
import { deleteBracketsCtrl } from "../../../usecase/deleteBrackets";
import { buildBracketCtrl } from "../../../usecase/buildContestBrackets";
import { getContestCtrl } from "../../../queries/getContest";
import { listContestBracketsCtrl } from "../../../queries/listContestBrackets";
import { addParticipantsToTeamCtrl } from "../../../usecase/addParticipantsToTeam";
import { removeParticipantFromTeamCtrl } from "../../../usecase/removeParticipantFromTeam";
import { createBracketClashCtrl } from "../../../usecase/createBracketClash";
import { paginateContestClashesCtrl } from "../../../queries/paginateClashes";
import { deleteContestClashCtrl } from "../../../usecase/deleteContestClash";
import { checkClashIsFinishedCtrl } from "../../../usecase/checkBracketClash";
import { deleteContestCtrl } from "../../../usecase/deleteContest";
import { removeInscribedCtrl } from "../../../usecase/removeInscribed";

export const contestRouter = express.Router();

contestRouter.get("/", (req, res) => listContestCtrl.execute(req, res));

contestRouter.post("/", (req, res) =>
	addTournamentContestCtrl.execute(req, res),
);

contestRouter.put("/add-participants", (req, res) =>
	addContestParticipantsCtrl.execute(req, res),
);

contestRouter.put("/add-couples", (req, res) =>
	addContestCouplesCtrl.execute(req, res),
);

contestRouter.put("/add-teams", (req, res) =>
	addContestTeamsCtrl.execute(req, res),
);

contestRouter.put("/remove-inscribed", (req, res) =>
	removeInscribedCtrl.execute(req, res),
);

contestRouter.get("/teams", (req, res) =>
	listContestTeamsCtrl.execute(req, res),
);

contestRouter.delete("/brackets", (req, res) =>
	deleteBracketsCtrl.execute(req, res),
);

contestRouter.put("/brackets", (req, res) =>
	buildBracketCtrl.execute(req, res),
);

contestRouter.get("/brackets/:contestId", (req, res) =>
	listContestBracketsCtrl.execute(req, res),
);

contestRouter.put("/add-participants-to-team", (req, res) =>
	addParticipantsToTeamCtrl.execute(req, res),
);

contestRouter.put("/remove-participant-from-team", (req, res) =>
	removeParticipantFromTeamCtrl.execute(req, res),
);

contestRouter.post("/create-bracket-clash", (req, res) =>
	createBracketClashCtrl.execute(req, res),
);

contestRouter.get("/clash", (req, res) =>
	paginateContestClashesCtrl.execute(req, res),
);

contestRouter.put("/clash/check-is-finished", (req, res) =>
	checkClashIsFinishedCtrl.execute(req, res),
);

contestRouter.delete("/clash/:contestClashId", (req, res) =>
	deleteContestClashCtrl.execute(req, res),
);

contestRouter.get("/:contestId", (req, res) =>
	getContestCtrl.execute(req, res),
);

contestRouter.delete("/:contestId", (req, res) =>
	deleteContestCtrl.execute(req, res),
);
