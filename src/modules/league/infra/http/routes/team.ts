import express from "express";
import { listTeamStatsController } from "../../../useCases/listTeamStats";
import { listTeamsController } from "../../../useCases/listTeams";
import { listTeamsByClubController } from "../../../useCases/listTeamByClub";
import { listRankingsController } from "../../../useCases/listRankings";
import { updateTeamRanking } from "../../../useCases/updateTeamRanking";
import { getTeamRankingController } from "../../../useCases/getTeamRanking";
import { featurePlayersController } from "../../../useCases/featurePlayers";
import { featureCouplesController } from "../../../useCases/featureCouples";
import { middleware } from "../../../../../shared/infra/http";
import { sequelizeTeamStatsRepo } from "../../../repositories";
import { TeamStatsMap } from "../../../mappers/teamStatsMap";

const teamRouter = express.Router();

teamRouter.get("/stats", (req, res) =>
    listTeamStatsController.execute(req, res)
);

teamRouter.put("/stats", middleware.adminAuthenticated(), async (req, res) => {
    try {
        const { seasonId, teamId, journey } = req.body;
        const teamStats = await sequelizeTeamStatsRepo.getStats(seasonId, teamId, journey);

        const updatedTeamStats = TeamStatsMap.toDomain({
            ...req.body,
            teamStatsId: teamStats.teamStatsId.id.toString(),
        })

        await sequelizeTeamStatsRepo.save(updatedTeamStats);

        return res.status(200).json({ "message": "Estadisticas actualizadas" });
    } catch (error) {
        return res.status(400).json({ "message": "Ha ocurrido un error" });
    }
})

teamRouter.get("/rankings/:teamId", (req, res) => getTeamRankingController.execute(req, res))

teamRouter.get("/rankings", (req, res) => listRankingsController.execute(req, res))

teamRouter.get("/", (req, res) => listTeamsController.execute(req, res))

teamRouter.get("/by-club/:clubId", (req, res) => listTeamsByClubController.execute(req, res))

teamRouter.get("/feature-players", (req, res) => featurePlayersController.execute(req, res))

teamRouter.get("/feature-couples", (req, res) => featureCouplesController.execute(req, res))

teamRouter.post("/rankings", async (req, res) => {

    console.log(req.body);

    const result = await updateTeamRanking.execute(req.body);

    if (result.isLeft()) {
        console.log(result.value.getErrorValue())
        return res.json({ message: "Error" });
    }

    return res.json({ message: "Success" })
})

export { teamRouter };
