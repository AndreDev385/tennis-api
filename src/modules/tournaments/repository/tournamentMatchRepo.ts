import { TournamentMatch } from "../domain/tournamentMatch"

export type TournamentMatchQuery = {
    matchId?: string
    tournamentId?: string
}

export type TournamentMatchRepo = {
    get(q: TournamentMatchQuery): Promise<TournamentMatch>
    save(match: TournamentMatch): Promise<void>
}
