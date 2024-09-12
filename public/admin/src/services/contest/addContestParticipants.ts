import { VITE_SERVER_URL } from "../../env/env.prod";
import { Result } from "../../shared/Result";

export type AddParticipantData = {
	firstName: string;
	lastName: string;
	ci: string;
	position: number | null;
};

type AddContestParticipants = {
	contestId: string;
	participants: AddParticipantData[];
};

export async function addContestParticipants(
	data: AddContestParticipants,
	token: string,
) {
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
			`${VITE_SERVER_URL}/api/v1/contest/add-participants`,
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
