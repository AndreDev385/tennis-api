import express from "express";

import { userRouter } from "../../../../modules/users/infra/http/routes";
import {
    categoryRouter,
    clubRouter,
} from "../../../../modules/league/infra/http/routes";
import { leagueRouter } from "../../../../modules/league/infra/http/routes/league";
import { seasonRouter } from "../../../../modules/league/infra/http/routes/season";
import { clashRouter } from "../../../../modules/league/infra/http/routes/clash";
import { playerRoute } from "../../../../modules/league/infra/http/routes/player";

const v1Router = express.Router();

v1Router.get("/", (req, res) => {
    return res.json({ message: "Yo! we're up" });
});

v1Router.use("/users", userRouter);
v1Router.use("/categories", categoryRouter);
v1Router.use("/club", clubRouter);
v1Router.use("/league", leagueRouter);
v1Router.use("/season", seasonRouter);
v1Router.use("/clash", clashRouter);
v1Router.use("/player", playerRoute)


export { v1Router };
