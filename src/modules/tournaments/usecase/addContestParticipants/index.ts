import { sequelizeUserRepo } from "../../../users/repositories";
import {
    sequelizeContestRepo,
    sequelizeParticipantRepo,
    sequelizeRegisterParticipantRepo,
} from "../../repository";
import { AddContestParticipants } from "./addParticipant";
import { AddContestParticipantsCtrl } from "./addParticipantsController";

const addContestParticipants = new AddContestParticipants(
    sequelizeContestRepo,
    sequelizeParticipantRepo,
    sequelizeUserRepo,
    sequelizeRegisterParticipantRepo
);

const addContestParticipantsCtrl = new AddContestParticipantsCtrl(
    addContestParticipants
);

export { addContestParticipantsCtrl };
