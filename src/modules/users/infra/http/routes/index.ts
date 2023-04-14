import express from "express";
import { createUserController } from "../../../user-cases/create-user";
import { loginController } from "../../../user-cases/login";

const userRouter = express.Router();

userRouter.post("/", (req, res) => createUserController.execute(req, res));

userRouter.post("/login", (req, res) => loginController.execute(req, res));

export { userRouter };
