import { VITE_SERVER_URL } from "../../env/env.prod";
import { Result } from "../../shared/Result";
import type { Tournament } from "../../types/tournament";

export async function getTournament(id: string): Promise<Result<Tournament>> {
	const url = `${VITE_SERVER_URL}/api/v1/tournament/${id}`;

	const requestOptions: RequestInit = {
		method: "GET",
		headers: { "Content-Type": "application/json" },
	};

	try {
		const response = await fetch(url, requestOptions);

		const data = await response.json();

		return Result.ok(data);
	} catch (error) {
		return Result.fail("Error al cargar torneos");
	}
}
