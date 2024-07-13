import { VITE_SERVER_URL } from "../../env/env.prod";
import { Result } from "../../shared/Result";

export const deleteContest = async (
	contestId: string,
	token: string,
): Promise<Result<string>> => {
	const url = `${VITE_SERVER_URL}/api/v1/contest/${contestId}`;
	const requestOptions = {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			Authorization: token,
		},
	};

	try {
		const response = await fetch(url, requestOptions);

		const data = await response.json();

		if (response.status !== 200) {
			return Result.fail(data.message ?? "Error");
		}

		return Result.ok(data.message);
	} catch (e) {
		return Result.fail("Ha ocurrido un error");
	}
};
