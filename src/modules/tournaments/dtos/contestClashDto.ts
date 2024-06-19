import { ContestTeamDto } from "./contestTeamDto";

export type ContestClashDto = {
    contestClashId: string;
    contestId: string;
    t1WonClash: boolean | null;
    isFinish: boolean
    matchIds: string[]
    team1: ContestTeamDto | null;
    team2: ContestTeamDto | null;
};
