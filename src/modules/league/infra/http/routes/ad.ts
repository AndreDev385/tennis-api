import express from "express";
import { middleware } from "../../../../../shared/infra/http";
import { createAdController } from "../../../useCases/createAd";
import { listAdsController } from "../../../useCases/listAds";
import { deleteAdController } from "../../../useCases/deleteAd";

const adsRouter = express.Router();

adsRouter.get("/", (req, res) => listAdsController.execute(req, res));

adsRouter.post(
    "/",
    middleware.adminAuthenticated(),
    middleware.uploadImageHandler.single("image"),
    (req, res) => createAdController.execute(req, res)
);

adsRouter.delete(
    "/:adId",
    middleware.ensureAuthenticated(),
    (req, res) => deleteAdController.execute(req, res)
)

export { adsRouter };
