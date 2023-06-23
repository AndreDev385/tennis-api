import { League } from "../domain/league";

export interface LeagueRepository {
    save(league: League): Promise<void>;
    list(): Promise<Array<any>>;
}
