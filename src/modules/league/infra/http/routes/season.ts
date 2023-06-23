import express from "express";
import { listSeasonController } from "../../../useCases/listSeasons";

const seasonRouter = express.Router()

seasonRouter.get("/:leagueId", (req, res) => listSeasonController.execute(req, res))

export {
    seasonRouter,
}
