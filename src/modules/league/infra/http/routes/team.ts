import express from "express";
import { listTeamStatsController } from "../../../useCases/listTeamStats";
import { listTeamsController } from "../../../useCases/listTeams";
import { listTeamsByClubController } from "../../../useCases/listTeamByClub";
import { listRankingsController } from "../../../useCases/listRankings";
import { getTeamRankingController } from "../../../useCases/getTeamRanking";
import { featurePlayersController } from "../../../useCases/featurePlayers";
import { featureCouplesController } from "../../../useCases/featureCouples";
import { middleware } from "../../../../../shared/infra/http";
import { deleteTeamController } from "../../../useCases/deleteTeam";

const teamRouter = express.Router();

teamRouter.get("/", (req, res) => listTeamsController.execute(req, res));

teamRouter.get("/stats", (req, res) =>
    listTeamStatsController.execute(req, res)
);

teamRouter.get("/rankings/:teamId", (req, res) =>
    getTeamRankingController.execute(req, res)
);

teamRouter.get("/rankings", (req, res) =>
    listRankingsController.execute(req, res)
);

teamRouter.get("/by-club/:clubId", (req, res) =>
    listTeamsByClubController.execute(req, res)
);

teamRouter.get("/feature-couples", (req, res) =>
    featureCouplesController.execute(req, res)
);

teamRouter.get("/feature-players", (req, res) =>
    featurePlayersController.execute(req, res)
);

teamRouter.delete(
    "/:teamId",
    middleware.adminAuthenticated() as any,
    (req, res) => deleteTeamController.execute(req, res)
);

export { teamRouter };
