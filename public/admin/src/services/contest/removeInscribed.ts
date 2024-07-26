import { VITE_SERVER_URL } from "../../env/env.prod";
import { Result } from "../../shared/Result";
import type { Couple } from "../../types/couple";
import type { Participant } from "../../types/participant";
import type { Team } from "../../types/team";

type Req = {
	position?: number | null;
	participant?: Participant | null;
	couple?: Couple | null;
	contestTeam?: Team | null;
};

export async function removeInscribed(
	contestId: string,
	req: Req,
	token: string,
): Promise<Result<string>> {
	const url = `${VITE_SERVER_URL}/api/v1/contest/remove-inscribed`;

	const options: RequestInit = {
		method: "PUT",
		headers: {
			Authorization: token,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			inscribed: {
				position: req.position ?? null,
				participant: req.participant ?? null,
				couple: req.couple ?? null,
				contestTeam: req.contestTeam ?? null,
			},
			contestId,
		}),
	};
	try {
		const response = await fetch(url, options);

		const body = await response.json();

		if (response.status !== 200) {
			return Result.fail(body.message);
		}

		return Result.ok(body.message);
	} catch (e) {
		return Result.fail("Ha ocurrido un error");
	}
}
