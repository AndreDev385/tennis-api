import { VITE_SERVER_URL } from "../../env/env.prod";
import { Result } from "../../shared/Result";

export type AddContestTeamDto = {
	contestId: string;
	teams: {
		name: string;
		position: number | null;
	}[];
};

export async function addContestTeams(data: AddContestTeamDto, token: string) {
	const requestOptions: RequestInit = {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: token,
		},
		body: JSON.stringify(data),
	};

	try {
		const response = await fetch(
			`${VITE_SERVER_URL}/api/v1/contest/add-teams`,
			requestOptions,
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
