import { sequelizeParticipantRepo } from "../../repository";
import { PaginateParticipants } from "./paginateParticipants";
import { PaginateParticipantsCtrl } from "./paginateParticipantsController";

const paginateParticipants = new PaginateParticipants(sequelizeParticipantRepo);

export const paginateParticipantsCtrl = new PaginateParticipantsCtrl(
    paginateParticipants
);
