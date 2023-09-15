import { Club } from "../domain/club";
import { ClubDto } from "../dtos/clubDto";

export interface ClubRepository {
    list(query: any): Promise<Array<ClubDto>>;
    findById(clubId: string): Promise<Club>;
    save(club: Club): Promise<void>;
}
