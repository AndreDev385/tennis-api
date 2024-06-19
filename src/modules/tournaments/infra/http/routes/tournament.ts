import express from "express";

import { newTournamentCtrl } from "../../../usecase/newTournament";
import { middleware } from "../../../../../shared/infra/http";
import { paginateTournamentsController } from "../../../queries/paginateTournaments";
import { listTournamentAdsCtrl } from "../../../queries/listTournamentAds";
import { deleteTournamentAdCtrl } from "../../../usecase/deleteTournamentAd";
import { uploadTournamentAdCtrl } from "../../../usecase/uploadTournamentAds";

const tournamentRouter = express.Router();

tournamentRouter.post(
    "/",
    middleware.adminAuthenticated() as any,
    middleware.uploadImageHandler.single("image"),
    (req, res) => newTournamentCtrl.execute(req, res)
);

tournamentRouter.get("/", (req, res) =>
    paginateTournamentsController.execute(req, res)
);

tournamentRouter.post(
    "/ads",
    middleware.adminAuthenticated() as any,
    middleware.uploadImageHandler.single("image"),
    (req, res) => uploadTournamentAdCtrl.execute(req, res)
);

tournamentRouter.get("/ads/:tournamentId", (req, res) =>
    listTournamentAdsCtrl.execute(req, res)
);

tournamentRouter.delete(
    "/ads/:tournamentId",
    middleware.adminAuthenticated() as any,
    (req, res) => deleteTournamentAdCtrl.execute(req, res)
);

export { tournamentRouter };
