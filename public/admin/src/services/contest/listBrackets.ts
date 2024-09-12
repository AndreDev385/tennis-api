import { VITE_SERVER_URL } from "../../env/env.prod";
import { Result } from "../../shared/Result";
import type { Bracket } from "../../types/bracket";
import { mapToUrlString } from "../../utils/mapToUrlString";

export async function listDraw(
	contestId: string,
	deep: number | null,
): Promise<Result<Bracket[]>> {
	let query = "";

	if (deep) query = mapToUrlString({ deep });

	const url = `${VITE_SERVER_URL}/api/v1/contest/brackets/${contestId}?${query}`;
	const requestOptions = {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	};

	try {
		const response = await fetch(url, requestOptions);

		const data = await response.json();

		if (response.status !== 200) {
			return Result.fail(data.message ?? "Error");
		}

		return Result.ok<Bracket[]>(data);
	} catch (e) {
		return Result.fail("Ha ocurrido un error");
	}
}
