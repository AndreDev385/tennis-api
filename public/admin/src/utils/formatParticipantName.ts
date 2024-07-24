import type { Participant } from "../types/participant";

export function formatParticipantName(p: Participant): string {
	return `${p.user.firstName} ${p.user.lastName}`;
}
