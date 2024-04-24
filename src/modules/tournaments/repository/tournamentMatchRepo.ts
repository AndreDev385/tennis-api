import { Result } from "../../../shared/core/Result";
import { TournamentMatch } from "../domain/tournamentMatch"

export type TournamentMatchQuery = {
    matchId?: string
    tournamentId?: string
    contestId?: string;
}

export type TournamentMatchRepo = {
    get(q: TournamentMatchQuery): Promise<Result<TournamentMatch>>
    save(match: TournamentMatch): Promise<void>
}
