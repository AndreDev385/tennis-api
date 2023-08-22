import express from "express";
import { listTeamStatsController } from "../../../useCases/listTeamStats";
import { listTeamsController } from "../../../useCases/listTeams";
import { listTeamsByClubController } from "../../../useCases/listTeamByClub";
import { listRankingsController } from "../../../useCases/listRankings";
import { updateTeamRanking } from "../../../useCases/updateTeamRanking";

const teamRouter = express.Router();

teamRouter.get("/stats", (req, res) =>
    listTeamStatsController.execute(req, res)
);

teamRouter.get("/rankings", (req, res) => listRankingsController.execute(req, res))

teamRouter.get("/", (req, res) => listTeamsController.execute(req, res))

teamRouter.get("/by-club/:clubId", (req, res) => listTeamsByClubController.execute(req, res))

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
