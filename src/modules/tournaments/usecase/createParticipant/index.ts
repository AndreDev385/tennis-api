import { sequelizeUserRepo } from "../../../users/repositories";
import { sequelizeParticipantRepo } from "../../repository";
import { CreateParticipant } from "./createParticipant";
import { CreateParticipantCtrl } from "./createParticipantController";

const createParticipant = new CreateParticipant(
	sequelizeParticipantRepo,
	sequelizeUserRepo,
);

export const createParticipantCtrl = new CreateParticipantCtrl(
	createParticipant,
);
