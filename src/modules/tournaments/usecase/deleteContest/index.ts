import { sequelizeContestRepo } from "../../repository";
import { DeleteContest } from "./deleteContest";
import { DeleteContestCtrl } from "./deleteContestController";

const deleteContest = new DeleteContest(sequelizeContestRepo);

export const deleteContestCtrl = new DeleteContestCtrl(deleteContest);
