import { VITE_SERVER_URL } from "../../env/env.prod";
import { Result } from "../../shared/Result";
import type {
	PaginateQuery,
	PaginateResponse,
} from "../../types/paginateQuery";
import type { TournamentMatch } from "../../types/tournamentMatch";
import { mapToUrlString } from "../../utils/mapToUrlString";

type PaginateTournamentMatchesQuery = PaginateQuery & {
	tournamentId?: string;
	contestId?: string;
};

type PaginateTournamentMatchesResponse = PaginateResponse<TournamentMatch>;

export async function paginateTournamentMatches(
	query: PaginateTournamentMatchesQuery,
): Promise<Result<PaginateTournamentMatchesResponse>> {
	const URL = `${VITE_SERVER_URL}/api/v1/tournament-match/pagination?${mapToUrlString(query)}`;

	const requestOptions: RequestInit = {
		method: "GET",
		headers: { "Content-Type": "application/json" },
	};

	try {
		const response = await fetch(URL, requestOptions);

		const body = await response.json();

		if (response.status !== 200) {
			return Result.fail(body.message);
		}

		return Result.ok(body);
	} catch (e) {
		console.log(e);
		return Result.fail("Ha ocurrido un error");
	}
}
