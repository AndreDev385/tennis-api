import express from "express";
import { middleware } from "../../../../../shared/infra/http";
import { createAdController } from "../../../useCases/createAd";

const adsRouter = express.Router();

adsRouter.post(
    "/usecase",
    middleware.adminAuthenticated(),
    middleware.uploadImageHandler.single("image"),
    (req, res) => createAdController.execute(req, res)
);

export { adsRouter };
