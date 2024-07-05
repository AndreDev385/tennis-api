import { VITE_SERVER_URL } from "../../env/env.prod";
import { Result } from "../../shared/Result";
import { mapToUrlString } from "../../utils/mapToUrlString";
import type { Tournament } from "../../types/tournament";
import type {
	PaginateQuery,
	PaginateResponse,
} from "../../types/paginateQuery";

export async function paginateTournaments(
	query: PaginateQuery,
): Promise<Result<PaginateResponse<Tournament>>> {
	const url = `${VITE_SERVER_URL}/api/v1/tournament?${mapToUrlString(query)}`;

	const requestOptions: RequestInit = {
		method: "GET",
		headers: { "Content-Type": "application/json" },
	};

	try {
		const response = await fetch(url, requestOptions);

		const data = await response.json();

		return Result.ok(data);
	} catch (error) {
		return Result.fail("Error al cargar torneos");
	}
}
