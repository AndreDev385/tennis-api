import express from 'express'
import { createUserController } from '../../../user-cases/create-user';

const userRouter = express.Router();

userRouter.post("/", (req, res) => createUserController.execute(req, res))

export {
    userRouter
}
