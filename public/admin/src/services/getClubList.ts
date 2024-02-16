import { VITE_SERVER_URL } from "../env/env.prod";
import { Result } from "../shared/Result";
import { mapToUrlString } from "../utils/mapToUrlString";

type ClubQuery = {
    isSubscribed?: boolean;
    code?: string;
    symbol?: string;
    name?: string;
};

async function getClubsList(query: ClubQuery): Promise<Result<any>> {

    const url = `${VITE_SERVER_URL}/api/v1/club?${mapToUrlString(query)}`;

    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };

    try {
        const response = await fetch(url, requestOptions);

        const data = await response.json();

        if (response.status != 200) {
            return Result.fail(data['message']);
        }

        return Result.ok(data);
    } catch (error) {
        const msg = (error as Error)?.message ?? error
        return Result.fail(msg)
    }
}

export { getClubsList }
