import { VITE_SERVER_URL } from "../../env/env.prod";
import { Result } from "../../shared/Result";
import type { Contest } from "../../types/contest";
import { mapToUrlString } from "../../utils/mapToUrlString";

type ListContestQuery = Record<string, string>;

export const listContest = async (
	query: ListContestQuery,
): Promise<Result<Contest[]>> => {
	const url = `${VITE_SERVER_URL}/api/v1/contest?${mapToUrlString(query)}`;
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

		return Result.ok<Contest[]>(data);
	} catch (e) {
		return Result.fail("Ha ocurrido un error");
	}
};
