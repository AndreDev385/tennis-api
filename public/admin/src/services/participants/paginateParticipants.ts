import { VITE_SERVER_URL } from "../../env/env.prod";
import { Result } from "../../shared/Result";
import type {
	PaginateQuery,
	PaginateResponse,
} from "../../types/paginateQuery";
import type { Participant } from "../../types/participant";
import { mapToUrlString } from "../../utils/mapToUrlString";

type Query = {
	participantId?: string | string[];
} & PaginateQuery;

export async function paginateParticipants(
	q: Query,
	token: string,
): Promise<Result<PaginateResponse<Participant>>> {
	const urlQuery = mapToUrlString(q);

	console.log(q, urlQuery);

	const options: RequestInit = {
		method: "GET",
		headers: {
			Authorization: token,
		},
	};

	try {
		const response = await fetch(
			`${VITE_SERVER_URL}/api/v1/participant?${urlQuery}`,
			options,
		);

		const body = await response.json();

		if (!response.ok) {
			return Result.fail(body.message);
		}

		return Result.ok(body);
	} catch (e) {
		return Result.fail("Ha ocurrido un error");
	}
}
