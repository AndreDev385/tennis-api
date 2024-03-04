import { VITE_SERVER_URL } from "../../env/env.prod";
import { ISeason } from "../../interfaces/interfaces";
import { Result } from "../../shared/Result";
import { mapToUrlString } from "../../utils/mapToUrlString";

export type SeasonQuery = {
    league?: string;
    isFinish?: boolean;
    isCurrentSeason?: boolean;
};

async function getSeasonList(
    query: SeasonQuery
): Promise<Result<ISeason[]> | Result<string>> {
    const url = `${VITE_SERVER_URL}/api/v1/season?${mapToUrlString(query)}`;

    const requestOptions: RequestInit = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    };

    try {
        const response = await fetch(url, requestOptions);

        const data = await response.json();

        return Result.ok<ISeason[]>(data);
    } catch (error) {
        return Result.fail<string>("Ha ocurrido un error");
    }
}

export { getSeasonList };
