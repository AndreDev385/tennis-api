import { Club } from "../domain/club";
import { ClubDto } from "../dtos/clubDto";

export interface ClubQuery {
    code?: string;
    isSubscribed?: boolean;
    symbol?: string;
    name?: string;
}

export interface ClubRepository {
    list(query: any): Promise<Array<ClubDto>>;
    findById(clubId: string): Promise<Club>;
    find(query: ClubQuery): Promise<Club>;
    save(club: Club): Promise<void>;
}
