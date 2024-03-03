import { VITE_SERVER_URL } from "../../env/env.prod";
import { Result } from "../../shared/Result";

async function removePlayerFromClub(playerId: string, token: string) {
    const url = `${VITE_SERVER_URL}/api/v1/player/${playerId}`;

    const requestOptions: RequestInit = {
        method: "DELETE",
        headers: {
            Authorization: token,
        },
    };

    try {
        const response = await fetch(url, requestOptions);

        const data = await response.json();

        if (response.status !== 200) {
            return Result.fail<string>(data["message"]);
        }

        return Result.ok<string>(data["message"]);
    } catch (error) {
        return Result.fail<string>("Ha ocurrido un error");
    }
}

export { removePlayerFromClub };
