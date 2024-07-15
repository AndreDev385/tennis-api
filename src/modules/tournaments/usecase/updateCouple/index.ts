import {
	sequelizeCoupleRepo,
	sequelizeParticipantRepo,
} from "../../repository";
import { UpdateCouple } from "./updateCouple";
import { UpdateCoupleCtrl } from "./updateCoupleController";

const updateCouple = new UpdateCouple(
	sequelizeCoupleRepo,
	sequelizeParticipantRepo,
);

export const updateCoupleCtrl = new UpdateCoupleCtrl(updateCouple);
