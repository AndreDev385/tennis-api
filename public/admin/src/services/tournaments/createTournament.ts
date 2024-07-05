import { VITE_SERVER_URL } from "../../env/env.prod";
import { Result } from "../../shared/Result";

export async function createTournament(formData: FormData, token: string) {
	const requestOptions = {
		method: "POST",
		headers: {
			Authorization: token,
		},
		body: formData,
	};

	try {
		const response = await fetch(
			`${VITE_SERVER_URL}/api/v1/tournament`,
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
