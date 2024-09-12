import type { Couple } from "./couple";
import type { Participant } from "./participant";
import type { ContestTeam } from "./contestTeam";

export type InscribedParticipant = {
	position: number | null;
	participant: Participant;
};

export type InscribedCouple = {
	position: number | null;
	couple: Couple;
};

export type InscribedTeam = {
	position: number | null;
	contestTeam: ContestTeam;
};
