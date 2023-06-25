import { Clash } from "../domain/clubClash";

export interface ClashRepository {
    save(clash: Clash): Promise<void>
    getClashById(id: string): Promise<Clash>;
    list(filters: any): Promise<Array<any>>
}
