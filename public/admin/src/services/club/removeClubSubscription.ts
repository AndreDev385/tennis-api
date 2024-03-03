import { VITE_SERVER_URL } from "../../env/env.prod";
import { Result } from "../../shared/Result";

async function unsubscribeClub(clubId: string): Promise<Result<string>> {
    const url = `${VITE_SERVER_URL}/api/v1/club/unsubscribe/${clubId}`;

    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    };

    try {
        const response = await fetch(url, requestOptions);

        const data = await response.json();

        if (response.status != 200) {
            return Result.fail<string>(data["message"]);
        }

        return Result.ok<string>(data["message"]);
    } catch (error) {
        return Result.fail("Ha ocurrido un error");
    }
}

export { unsubscribeClub };
