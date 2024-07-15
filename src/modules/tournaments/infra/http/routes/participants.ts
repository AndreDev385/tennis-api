import express from "express";
import { paginateParticipantsCtrl } from "../../../queries/paginateParticipants";
import { getParticipantStatsCtrl } from "../../../queries/getParticipantStats";
import { createParticipantCtrl } from "../../../usecase/createParticipant";

export const particpantsRouter = express.Router();

particpantsRouter.get("/", (req, res) =>
	paginateParticipantsCtrl.execute(req, res),
);

particpantsRouter.get("/stats/:participantId", (req, res) =>
	getParticipantStatsCtrl.execute(req, res),
);

particpantsRouter.post("/", (req, res) =>
	createParticipantCtrl.execute(req, res),
);
