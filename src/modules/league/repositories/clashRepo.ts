import { ClubClash } from "../domain/clubClash";

export interface ClashRepository {
    save(clash: ClubClash): Promise<void>
    getClashById(id: string): Promise<ClubClash>;
    list(filters: any): Promise<Array<any>>
}
