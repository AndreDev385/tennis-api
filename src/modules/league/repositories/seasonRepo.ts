import { Season } from "../domain/season";

export interface SeasonRepository {
    save(season: Season): Promise<void>;
    listSeasonsByLeague(leagueId: string): Promise<Array<any>>
    findById(seasonId: string): Promise<Season>
}
