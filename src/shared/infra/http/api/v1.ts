import express from "express";

import { userRouter } from "../../../../modules/users/infra/http/routes";
import {
	categoryRouter,
	clubRouter,
	leagueRouter,
	seasonRouter,
	clashRouter,
	playerRoute,
	matchRouter,
	eventRouter,
} from "../../../../modules/league/infra/http/routes";
import { utilsRouter } from "../../../../modules/league/infra/http/routes/utils";
import { teamRouter } from "../../../../modules/league/infra/http/routes/team";
import { adsRouter } from "../../../../modules/league/infra/http/routes/ad";
import { exportSequelizeDb } from "../exportDb";
import {
	tournamentRouter,
	particpantsRouter,
	tournamentMatchRouter,
	contestRouter,
} from "../../../../modules/tournaments/infra/http/routes/";
import { middleware } from "..";
import { couplesRouter } from "../../../../modules/tournaments/infra/http/routes/couples";

const v1Router = express.Router();

v1Router.get("/", (_, res) => {
	return res.json({ message: "Yo! we're up" });
});

v1Router.get(
	"/export-database",
	middleware.adminAuthenticated() as any,
	(req, res) => exportSequelizeDb(req, res),
);

v1Router.use("/users", userRouter);

v1Router.use("/ads", adsRouter);
v1Router.use("/match", matchRouter);
v1Router.use("/categories", categoryRouter);
v1Router.use("/club", clubRouter);
v1Router.use("/league", leagueRouter);
v1Router.use("/season", seasonRouter);
v1Router.use("/clash", clashRouter);
v1Router.use("/player", playerRoute);
v1Router.use("/utils", utilsRouter);
v1Router.use("/event", eventRouter);
v1Router.use("/team", teamRouter);

//tournaments
v1Router.use("/tournament", tournamentRouter);
v1Router.use("/participant", particpantsRouter);
v1Router.use("/contest", contestRouter);
v1Router.use("/tournament-match", tournamentMatchRouter);
v1Router.use("/couples", couplesRouter);

export { v1Router };
