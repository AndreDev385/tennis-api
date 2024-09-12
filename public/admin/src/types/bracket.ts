import type { Couple } from "./couple";
import type { Participant } from "./participant";
import type { ContestTeam } from "./contestTeam";
import type { TournamentMatch } from "./tournamentMatch";
import type { ContestClash } from "./contestClash";

export type Bracket = {
	id: string;
	contestId: string;
	phase: 0 | 1 | 2;
	match?: TournamentMatch;
	clash?: ContestClash;
	left: string;
	right: string;
	parent: string;
	deep: number;
	rightPlace: Place;
	leftPlace: Place;
};

export type Place = {
	value: number;
	participant: Participant | null;
	couple: Couple | null;
	contestTeam: ContestTeam | null;
};
