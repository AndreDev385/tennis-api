import { VITE_SERVER_URL } from "../../env/env.prod";
import { Result } from "../../shared/Result";

export async function deleteTournament(
	tournamentId: string,
	token: string,
): Promise<Result<string>> {
	const requestOptions = {
		method: "DELETE",
		headers: {
			Authorization: token,
		},
	};

	try {
		const response = await fetch(
			`${VITE_SERVER_URL}/api/v1/tournament/${tournamentId}`,
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
