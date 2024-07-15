import express from "express";
import { paginateCouplesCtrl } from "../../../queries/paginateCouples";
import { updateCoupleCtrl } from "../../../usecase/updateCouple";

export const couplesRouter = express.Router();

couplesRouter.get("/", (req, res) => paginateCouplesCtrl.execute(req, res));

couplesRouter.put("/", (req, res) => updateCoupleCtrl.execute(req, res));
