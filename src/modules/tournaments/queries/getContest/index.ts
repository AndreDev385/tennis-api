import { sequelizeContestRepo } from "../../repository";
import { GetContest } from "./getContest";
import { GetContestCtrl } from "./getContestController";

const getContest = new GetContest(sequelizeContestRepo);

export const getContestCtrl = new GetContestCtrl(getContest)
