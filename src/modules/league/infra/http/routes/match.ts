import express from "express";
import { middleware } from "../../../../../shared/infra/http";
import { createMatchController } from "../../../useCases/createMatch";

const matchRouter = express.Router();

matchRouter.post("/", middleware.ensureAuthenticated(), (req, res) =>
    createMatchController.execute(req, res)
);

export { matchRouter };
