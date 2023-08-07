import express from "express";

import {
    createTrackerController,
    createUserController,
} from "../../../useCases/createUser";
import { loginController } from "../../../useCases/login";
import { forgetPasswordController } from "../../../useCases/forget-password";
import {
    getUserByEmailController,
    getUserByEmailWithToken,
} from "../../../useCases/getUserByEmail";
import { middleware } from "../../../../../shared/infra/http";
import { adminLoginController } from "../../../useCases/adminLogin";
import {
    changeForgottenPasswordController,
    changePasswordController,
} from "../../../useCases/changePassword";
import { listUserController } from "../../../useCases/listUsers";
import { validatePasswordCodeController } from "../../../useCases/validatePasswordCode";

const userRouter = express.Router();

userRouter.get("/", middleware.ensureAuthenticated(), (req, res) => listUserController.execute(req, res));

userRouter.post("/", (req, res) => createUserController.execute(req, res));

userRouter.post("/tracker", middleware.adminAuthenticated(), (req, res) =>
    createTrackerController.execute(req, res)
);

userRouter.post("/login", (req, res) => loginController.execute(req, res));

userRouter.post("/admin/login", (req, res) =>
    adminLoginController.execute(req, res)
);

userRouter.post("/forget-password", (req, res) =>
    forgetPasswordController.execute(req, res)
);

userRouter.post("/change-forgotten-password", (req, res) =>
    changeForgottenPasswordController.execute(req, res)
);

userRouter.post("/validate-password-code", (req, res) =>
    validatePasswordCodeController.execute(req, res)
);

userRouter.put(
    "/change-password",
    middleware.ensureAuthenticated(),
    (req, res) => changePasswordController.execute(req, res)
);

userRouter.get("/me", middleware.ensureAuthenticated(), (req, res) =>
    getUserByEmailWithToken.execute(req, res)
);

userRouter.get("/:email", (req, res) =>
    getUserByEmailController.execute(req, res)
);

export { userRouter };
