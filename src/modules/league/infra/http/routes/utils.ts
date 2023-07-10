import express from "express";
import { listJourneysController } from "../../../useCases/listJourneys";

const utilsRouter = express.Router();

utilsRouter.get("/journeys", (req, res) => listJourneysController.execute(req, res));

export { utilsRouter };
