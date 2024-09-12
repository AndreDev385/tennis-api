import { VITE_SERVER_URL } from "../../env/env.prod";
import { Result } from "../../shared/Result";
import type { User } from "../../types/users";
import { mapToUrlString } from "../../utils/mapToUrlString";

type ListUsersQuery = {
	token: string;
	query: {
		[index: string]: string;
	};
};

export const listUsers = async ({
	token,
	query,
}: ListUsersQuery): Promise<Result<User[]>> => {
	const url = `${VITE_SERVER_URL}/api/v1/users?${mapToUrlString(query)}`;
	const requestOptions = {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: token,
		},
	};

	try {
		const response = await fetch(url, requestOptions);

		const data = await response.json();

		if (response.status !== 200) {
			return Result.fail(data.message ?? "Error");
		}

		return Result.ok<User[]>(data);
	} catch (e) {
		console.log(`Error al listar usuarios\n${e}`);
		return Result.fail("Ha ocurrido un error");
	}
};
