import express from "express";
import { paginateParticipantsCtrl } from "../../../queries/paginateParticipants";
import { getParticipantStatsCtrl } from "../../../queries/getParticipantStats";

export const particpantsRouter = express.Router();

particpantsRouter.get("/", (req, res) =>
    paginateParticipantsCtrl.execute(req, res)
);

particpantsRouter.get("/stats/:participantId", (req, res) =>
    getParticipantStatsCtrl.execute(req, res)
)
