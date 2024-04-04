import express from "express";
import { paginateParticipantsCtrl } from "../../../queries/paginateParticipants";

const particpantsRouter = express.Router();

particpantsRouter.get("/", (req, res) =>
    paginateParticipantsCtrl.execute(req, res)
);

export { particpantsRouter }

