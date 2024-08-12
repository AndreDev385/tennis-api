export type MatchStatus = 0 | 1 | 2 | 3 | 4;

export enum StatusValues {
	Waiting = 0,
	Live = 1,
	Paused = 2,
	Canceled = 3,
	Finished = 4,
}

export function mapMatchStatusToString(status: MatchStatus) {
	if (status === StatusValues.Live) {
		return "En vivo";
	}

	if (status === StatusValues.Paused) {
		return "Pausado";
	}

	if (status === StatusValues.Canceled) {
		return "Cancelado";
	}

	if (status === StatusValues.Finished) {
		return "Completado";
	}

	return "En espera";
}
