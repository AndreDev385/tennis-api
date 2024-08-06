import type { ContestTeam } from "./contestTeam";

export type ContestClash = {
	contestClashId: string;
	contestId: string;
	t1Wonclash?: boolean;
	isFinish: boolean;
	matchIds: string[];
	team1: ContestTeam;
	team2: ContestTeam;
};
