import { VITE_SERVER_URL } from "../../env/env.prod";
import { Result } from "../../shared/Result";

export enum Phases {
	MainTree = 0,
	ForThirdTree = 1,
	RepechageTree = 2,
}

type Data = {
	contestId: string;
	phase: 0 | 1 | 2;
};

export async function createBrackets(
	data: Data,
	token: string,
): Promise<Result<string>> {
	const reqOptions: RequestInit = {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: token,
		},
		body: JSON.stringify(data),
	};
	try {
		const response = await fetch(
			`${VITE_SERVER_URL}/api/v1/contest/brackets`,
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
