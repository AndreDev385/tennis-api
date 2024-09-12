import { VITE_SERVER_URL } from "../../env/env.prod";
import { Result } from "../../shared/Result";
import { mapToUrlString } from "../../utils/mapToUrlString";

type Data = {
	contestId: string;
	phase: 0 | 1 | 2;
};

export async function deleteBrackets(
	data: Data,
	token: string,
): Promise<Result<string>> {
	const reqOptions: RequestInit = {
		method: "DELETE",
		headers: {
			Authorization: token,
		},
	};
	try {
		const response = await fetch(
			`${VITE_SERVER_URL}/api/v1/contest/brackets?${mapToUrlString(data)}`,
			reqOptions,
		);

		const body = await response.json();

		if (response.status !== 200) {
			return Result.fail(body.message);
		}

		return Result.ok(body.message);
	} catch (e) {
		return Result.fail("Ha ocurrido un error");
	}
}
