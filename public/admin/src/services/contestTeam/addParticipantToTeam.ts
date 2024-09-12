import { VITE_SERVER_URL } from "../../env/env.prod";
import { Result } from "../../shared/Result";

type Req = {
	contestTeamId: string;
	participants: Array<{
		firstName: string;
		lastName: string;
		ci: string;
	}>;
};

export async function addParticipantToTeam(
	req: Req,
	token: string,
): Promise<Result<string>> {
	const options: RequestInit = {
		method: "PUT",
		body: JSON.stringify(req),
		headers: {
			Authorization: token,
			"Content-Type": "application/json",
		},
	};

	try {
		const response = await fetch(
			`${VITE_SERVER_URL}/api/v1/contest/add-participants-to-team`,
			options,
		);

		const body = await response.json();

		if (!response.ok) {
			return Result.fail(body.message);
		}

		return Result.ok(body.message);
	} catch (e) {
		return Result.fail("Ha ocurrido un error");
	}
}
