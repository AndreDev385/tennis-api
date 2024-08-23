import { VITE_SERVER_URL } from "../../env/env.prod";
import { Result } from "../../shared/Result";
import type { ContestTeam } from "../../types/contestTeam";
import type { Couple } from "../../types/couple";
import type { Participant } from "../../types/participant";

type Inscribed = {
	participant?: Participant;
	couple?: Couple;
	contestTeam?: ContestTeam;
};

type Req = {
	id: string;
	rightPlace: Inscribed;
	leftPlace: Inscribed;
	mode: string;
};

export async function updateBracket(
	req: Req,
	token: string,
): Promise<Result<string>> {
	const options: RequestInit = {
		method: "PATCH",
		body: JSON.stringify(req),
		headers: {
			Authorization: token,
			"Content-Type": "application/json",
		},
	};

	try {
		const response = await fetch(
			`${VITE_SERVER_URL}/api/v1/contest/bracket`,
			options,
		);

		const body = await response.json();

		return Result.ok(body.message);
	} catch (e) {
		return Result.fail("Ha ocurrido un error");
	}
}
