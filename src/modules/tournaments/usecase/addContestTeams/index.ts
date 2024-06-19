import {
    sequelizeContestRepo,
    sequelizeContestTeamRepo,
} from "../../repository";
import { AddContestTeams } from "./addContestTeams";
import { AddContestTeamsCtrl } from "./addContestTeamsController";

const addContestTeams = new AddContestTeams(
    sequelizeContestTeamRepo,
    sequelizeContestRepo
);

export const addContestTeamsCtrl = new AddContestTeamsCtrl(addContestTeams);
