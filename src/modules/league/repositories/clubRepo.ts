import { Club } from "../domain/club";
import { ClubDto } from "../dtos/clubDto";

export interface ClubRepository {
    list(): Promise<Array<ClubDto>>
    findById(clubId: string): Promise<Club>
}
