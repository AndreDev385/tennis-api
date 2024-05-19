import { sequelizeContestTeamRepo } from "../../repository";
import { ListContestTeamsCtrl } from "./listContestTeamController";
import { ListContestTeams } from "./listContestTeams";

const listContestTeams = new ListContestTeams(sequelizeContestTeamRepo);

export const listContestTeamsCtrl = new ListContestTeamsCtrl(listContestTeams);
