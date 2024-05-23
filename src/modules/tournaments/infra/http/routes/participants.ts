import express from "express";
import { paginateParticipantsCtrl } from "../../../queries/paginateParticipants";

export const particpantsRouter = express.Router();

particpantsRouter.get("/", (req, res) =>
    paginateParticipantsCtrl.execute(req, res)
);
