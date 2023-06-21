import express from "express";

import { userRouter } from "../../../../modules/users/infra/http/routes";
import {
    categoryRouter,
    clubRouter,
} from "../../../../modules/league/infra/http/routes";

const v1Router = express.Router();

v1Router.get("/", (req, res) => {
    return res.json({ message: "Yo! we're up" });
});

v1Router.use("/users", userRouter);
v1Router.use("/categories", categoryRouter);
v1Router.use("/club", clubRouter);

export { v1Router };
