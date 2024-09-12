import { VITE_SERVER_URL } from "../../env/env.prod";
import { Result } from "../../shared/Result";
import type { ContestTeam } from "../../types/contestTeam";
import { mapToUrlString } from "../../utils/mapToUrlString";

type Query = {
	tournamentId?: string;
	contestId?: string;
	contestTeamId?: string;
};

export async function listContestTeams(
	q: Query,
	token: string,
): Promise<Result<ContestTeam[]>> {
	const urlQuery = mapToUrlString(q);

	const options: RequestInit = {
		method: "GET",
		headers: {
			Authorization: token,
		},
	};

	try {
		const response = await fetch(
			`${VITE_SERVER_URL}/api/v1/contest/teams?${urlQuery}`,
			options,
		);

		const body = await response.json();

		if (!response.ok) {
			return Result.ok(body.message);
		}

		return Result.ok(body);
	} catch (e) {
		return Result.fail("Ha ocurrido un error");
	}
}
