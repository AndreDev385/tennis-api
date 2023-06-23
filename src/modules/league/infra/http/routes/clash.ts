import express from "express";
import { createClashController } from "../../../useCases/createClash";
import { listClashController } from "../../../useCases/listClash";

const clashRouter = express.Router();

clashRouter.post("/", (req, res) => createClashController.execute(req, res));
clashRouter.get("/", (req, res) => listClashController.execute(req, res));

export { clashRouter };
