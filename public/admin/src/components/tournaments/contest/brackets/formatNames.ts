import type { Place } from "../../../../types/bracket";
import { formatParticipantName } from "../../../../utils/formatParticipantName";

export function buildNameForDisplay(place: Place) {
	if (place.couple != null) {
		return `${formatParticipantName(place.couple.p1)} / ${formatParticipantName(place.couple.p2)}`;
	}

	if (place.participant != null) {
		return `${formatParticipantName(place.participant)}`;
	}

	if (place.contestTeam != null) {
		return place.contestTeam.name;
	}

	return "";
}
