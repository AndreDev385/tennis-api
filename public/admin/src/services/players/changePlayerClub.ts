import { VITE_SERVER_URL } from "../../env/env.prod";
import { Result } from "../../shared/Result";

type Params = {
    playerId: string;
    clubId: string;
    token: string;
};

async function changePlayerClub({ playerId, clubId, token }: Params) {
    const url = `${VITE_SERVER_URL}/api/v1/player`;

    const body = JSON.stringify({ playerId, clubId });

    const requestOptions: RequestInit = {
        method: "PUT",
        body,
        headers: {
            "Content-Type": "application/json",
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

export { changePlayerClub };
