import express from "express";
import { listTeamStatsController } from "../../../useCases/listTeamStats";

const teamRouter = express.Router();

teamRouter.get("/stats", (req, res) =>
    listTeamStatsController.execute(req, res)
);

export { teamRouter };
