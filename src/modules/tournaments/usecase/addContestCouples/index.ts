import { sequelizeUserRepo } from "../../../users/repositories";
import {
    sequelizeRegisterCouplesRepo,
    sequelizeCoupleRepo,
    sequelizeContestRepo,
    sequelizeParticipantRepo,
} from "../../repository";
import { AddContestCouples } from "./addContestCouples";
import { AddContestCouplesController } from "./addContestCouplesController";

const addContestCouples = new AddContestCouples(
    sequelizeRegisterCouplesRepo,
    sequelizeCoupleRepo,
    sequelizeContestRepo,
    sequelizeUserRepo,
    sequelizeParticipantRepo
);

export const addContestCouplesCtrl = new AddContestCouplesController(
    addContestCouples
);
