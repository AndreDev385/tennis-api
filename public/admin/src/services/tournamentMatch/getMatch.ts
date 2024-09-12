import { VITE_SERVER_URL } from "../../env/env.prod";
import { Result } from "../../shared/Result";
import type { TournamentMatch } from "../../types/tournamentMatch";
import { mapToUrlString } from "../../utils/mapToUrlString";

type Query = {
	matchId?: string | string[];
	tournamentId?: string;
	contestId?: string;
	status?: number;
};

export async function getTournamentMatch(
	filters: Query,
): Promise<Result<TournamentMatch>> {
	const query = mapToUrlString(filters);

	const options: RequestInit = {
		method: "GET",
	};

	try {
		const response = await fetch(
			`${VITE_SERVER_URL}/api/v1/tournament-match?${query}`,
			options,
		);
		const body = await response.json();

		if (response.status !== 200) {
			return Result.fail(body.message);
		}

		return Result.ok(body);
	} catch (e) {
		return Result.fail("Ha ocurrido un error");
	}
}
