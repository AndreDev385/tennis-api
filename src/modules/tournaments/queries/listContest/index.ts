import { sequelizeContestRepo } from "../../repository";
import { ListContest } from "./listContest";
import { ListContestCtrl } from "./listContestController";

export const listContest = new ListContest(sequelizeContestRepo);

export const listContestCtrl = new ListContestCtrl(listContest);
