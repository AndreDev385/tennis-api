import express from "express";
import { listLeagueController } from "../../../useCases/listLeague";

const leagueRouter = express.Router();

leagueRouter.get("/", (req, res) => listLeagueController.execute(req, res));

export { leagueRouter };
