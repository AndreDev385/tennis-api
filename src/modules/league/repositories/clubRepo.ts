import { ClubDto } from "../dtos/clubDto";

export interface ClubRepository {
    list(): Promise<Array<ClubDto>>
}
