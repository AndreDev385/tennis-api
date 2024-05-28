import express from "express";
import { middleware } from "../../../../../shared/infra/http";
import { createAdController } from "../../../useCases/createAd";
import { listAdsController } from "../../../useCases/listAds";
import { deleteAdController } from "../../../useCases/deleteAd";
import { newHomeAdCtrl } from "../../../../shared/usecase/newHomeAd";
import { listHomeAdsCtrl } from "../../../../shared/queries/listHomeAds";
import { deleteHomeAdCtrl } from "../../../../shared/usecase/deleteHomeAd";

const adsRouter = express.Router();

adsRouter.get("/", (req, res) => listAdsController.execute(req, res));

adsRouter.post(
    "/",
    middleware.adminAuthenticated() as any,
    middleware.uploadImageHandler.single("image"),
    (req, res) => createAdController.execute(req, res)
);

adsRouter.delete(
    "/:adId",
    middleware.ensureAuthenticated() as any,
    (req, res) => deleteAdController.execute(req, res)
);

adsRouter.post(
    "/home",
    middleware.adminAuthenticated() as any,
    middleware.uploadImageHandler.single("image"),
    (req, res) => newHomeAdCtrl.execute(req, res)
);

adsRouter.get("/home", (req, res) => listHomeAdsCtrl.execute(req, res));

adsRouter.delete("/home/:image", (req, res) =>
    deleteHomeAdCtrl.execute(req, res)
);

export { adsRouter };
