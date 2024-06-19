import { sequelizeParticipantTrackerRepo } from "../../repository";
import { GetParticipantStats } from "./getParticipantStats";
import { GetParticipantStatsCtrl } from "./getParticipantStatsController";

const getParticipantStats = new GetParticipantStats(sequelizeParticipantTrackerRepo);

export const getParticipantStatsCtrl = new GetParticipantStatsCtrl(getParticipantStats);
