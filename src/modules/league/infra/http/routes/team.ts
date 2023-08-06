import express from "express";
import { listTeamStatsController } from "../../../useCases/listTeamStats";
import { listTeamsController } from "../../../useCases/listTeams";
import { listTeamsByClubController } from "../../../useCases/listTeamByClub";

const teamRouter = express.Router();

teamRouter.get("/stats", (req, res) =>
    listTeamStatsController.execute(req, res)
);

teamRouter.get("/", (req, res) => listTeamsController.execute(req, res))

teamRouter.get("/by-club/:clubId", (req, res) => listTeamsByClubController.execute(req, res))

export { teamRouter };
