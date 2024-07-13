import type { Couple } from "./couple";
import type { Participant } from "./participant";
import type { Team } from "./team";

export type InscribedList = {
	participants?: InscribedParticipant[];
	couples?: InscribedCouple[];
	teams?: InscribedTeam[];
};

type InscribedParticipant = {
	position: number | null;
	participant: Participant;
};

type InscribedCouple = {
	position: number | null;
	couple: Couple;
};

type InscribedTeam = {
	position: number | null;
	team: Team;
};
