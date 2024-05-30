import { VITE_SERVER_URL } from "../env/env.prod";
import { Result } from "../shared/Result";

export async function importDb(): Promise<Result<any>> {
    const url = `${VITE_SERVER_URL}/api/v1/export-database`;
    const token: string = localStorage.getItem("authorization") || "";

    const requestOptions: RequestInit = {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: token },
    };

    try {
        console.log("FUNCTION")

        const response = await fetch(url, requestOptions);

        const blob = await response.blob();

        return Result.ok(blob);
    } catch (error) {
        console.log(error);
        return Result.fail("Ha ocurrido un error");
    }
}
