import express from "express";
import { createUserController } from "../../../useCases/createUser";
import { loginController } from "../../../useCases/login";
import { forgetPasswordController } from "../../../useCases/forget-password";
import { getUserByEmailController } from "../../../useCases/getUserByEmail";

const userRouter = express.Router();

userRouter.post("/", (req, res) => createUserController.execute(req, res));

userRouter.post("/login", (req, res) => loginController.execute(req, res));

userRouter.post("/forget-password", (req, res) =>
    forgetPasswordController.execute(req, res)
);

userRouter.get("/:email", (req, res) =>
    getUserByEmailController.execute(req, res)
);

export { userRouter };
