import { Clash } from "../domain/clubClash";

export interface ClashRepository {
    clashExist(team1: string, team2: string, journey: string): Promise<boolean>
    save(clash: Clash): Promise<void>;
    getClashById(id: string): Promise<Clash>;
    list(filters: any): Promise<Array<Clash>>;
}
