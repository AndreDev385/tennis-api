import express from "express";
import { middleware } from "../../../../../shared/infra/http";
import { createAdController } from "../../../useCases/createAd";
import { listAdsController } from "../../../useCases/listAds";

const adsRouter = express.Router();

adsRouter.get("/", (req, res) => listAdsController.execute(req, res));

adsRouter.post(
    "/",
    middleware.adminAuthenticated(),
    middleware.uploadImageHandler.single("image"),
    (req, res) => createAdController.execute(req, res)
);

export { adsRouter };
