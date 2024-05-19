import { Result } from "../../../shared/core/Result"
import { TournamentAd } from "../domain/tournamentAd"

export type TournamentAdQuery = {
    image?: string;
    link?: string;
    tournamentId?: string;
}

export type TournamentAdRepository = {
    save(ad: TournamentAd): Promise<Result<void>>;
    delete(image: string): Promise<Result<void>>;
    list(q: TournamentAdQuery): Promise<Array<TournamentAd>>;
}
