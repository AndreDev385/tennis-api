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
import { editUserController } from "../../../useCases/editUser";
import {
    deleteUserController,
    deleteUserFromAdminController,
} from "../../../useCases/deleteUser";

const userRouter = express.Router();

userRouter.get("/", middleware.ensureAuthenticated() as any, (req, res) =>
    listUserController.execute(req, res)
);

/**
 * @openapi
 * /api/v1/users/:
 *   post:
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserDto'
 *     responses:
 *       201:
 *         description: Logged In
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */
userRouter.post("/", (req, res) => createUserController.execute(req, res));

userRouter.put("/", middleware.ensureAuthenticated() as any, (req, res) =>
    editUserController.execute(req, res)
);

userRouter.post(
    "/tracker",
    middleware.adminAuthenticated() as any,
    (req, res) => createTrackerController.execute(req, res)
);

/**
 * @openapi
 * /api/v1/users/login:
 *   post:
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginDto'
 *     responses:
 *       201:
 *         description: Logged In
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */
userRouter.post("/login", (req, res) => loginController.execute(req, res));

/**
 * @openapi
 * /api/v1/users/admin/login:
 *   post:
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginDto'
 *     responses:
 *       201:
 *         description: Logged In
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */
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
    middleware.ensureAuthenticated() as any,
    (req, res) => changePasswordController.execute(req, res)
);

userRouter.get("/me", middleware.ensureAuthenticated() as any, (req, res) =>
    getUserByEmailWithToken.execute(req, res)
);

userRouter.get("/:email", (req, res) =>
    getUserByEmailController.execute(req, res)
);

userRouter.put(
    "/delete/:userId",
    middleware.adminAuthenticated() as any,
    (req, res) => deleteUserFromAdminController.execute(req, res)
);

userRouter.put("/delete", middleware.ensureAuthenticated() as any, (req, res) =>
    deleteUserController.execute(req, res)
);


export { userRouter };
