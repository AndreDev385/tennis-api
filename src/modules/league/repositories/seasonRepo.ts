import { Season } from "../domain/season";
import { SeasonDto } from "../dtos/seasonDto";

export interface SeasonQuery {
    league?: string;
}

export interface SeasonRepository {
    save(season: Season): Promise<void>;
    list(query: SeasonQuery): Promise<Array<SeasonDto>>
    findById(seasonId: string): Promise<Season>
}
