import express from 'express';
import { listClubController } from '../../../useCases/listClubs';

const clubRouter = express.Router();

clubRouter.get("/", (req, res) => listClubController.execute(req, res))

export {
    clubRouter,
}
