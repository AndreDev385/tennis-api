import { VITE_SERVER_URL } from "../../env/env.prod";
import { Result } from "../../shared/Result";

export type AddContestCouplesDto = {
	contestId: string;
	couples: AddCoupleDto[];
};

export type AddCoupleDto = {
	position: number | null;
	p1: {
		firstName: string;
		lastName: string;
		ci: string;
	};
	p2: {
		firstName: string;
		lastName: string;
		ci: string;
	};
};

export async function addContestCouples(
	data: AddContestCouplesDto,
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
			`${VITE_SERVER_URL}/api/v1/contest/add-couples`,
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
