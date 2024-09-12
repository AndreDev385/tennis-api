import type {
	InscribedCouple,
	InscribedParticipant,
	InscribedTeam,
} from "../types/inscribed";
import { formatParticipantName } from "./formatParticipantName";

export function formatInscribedString(
	o: InscribedParticipant | InscribedCouple | InscribedTeam,
) {
	if (isInscribedCouple(o)) {
		return `${formatParticipantName(o.couple.p1)} / ${formatParticipantName(o.couple.p2)}`;
	}

	if (isInscribedParticipant(o)) {
		return formatParticipantName(o.participant);
	}

	if (isInscribedTeam(o)) {
		return o.contestTeam.name;
	}

	return "";
}

function isInscribedParticipant(
	o: InscribedParticipant | InscribedTeam | InscribedCouple,
): o is InscribedParticipant {
	return Object.keys(o).includes("participant");
}

function isInscribedCouple(
	o: InscribedParticipant | InscribedTeam | InscribedCouple,
): o is InscribedCouple {
	return Object.keys(o).includes("couple");
}

function isInscribedTeam(
	o: InscribedParticipant | InscribedTeam | InscribedCouple,
): o is InscribedTeam {
	return Object.keys(o).includes("contestTeam");
}
