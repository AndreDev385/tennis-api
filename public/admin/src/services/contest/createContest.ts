import { VITE_SERVER_URL } from "../../env/env.prod";
import { Result } from "../../shared/Result";

type NewContestDto = {
	mode: string;
	categoryType: number;
	categoryId?: string;
	summation?: {
		letter: string;
		value: number;
	};
};

type AddTournamentContestDto = {
	tournamentId: string;
	contest: NewContestDto;
};

export const createContest = async (
	body: AddTournamentContestDto,
	token: string,
): Promise<Result<string>> => {
	const url = `${VITE_SERVER_URL}/api/v1/contest`;
	const requestOptions: RequestInit = {
		method: "POST",
		body: JSON.stringify(body),
		headers: {
			"Content-Type": "application/json",
			Authorization: token,
		},
	};

	try {
		const response = await fetch(url, requestOptions);

		console.log(response.body);

		const data = await response.json();

		if (response.status !== 200) {
			return Result.fail(data.message ?? "Error");
		}

		return Result.ok(data.message);
	} catch (e) {
		return Result.fail("Ha ocurrido un error");
	}
};
