import { Ad } from "../domain/ad";

export interface AdQuery {
    clubId?: string
}

export interface AdRepository {
    list(query: AdQuery): Promise<Array<Ad>>
    save(ad: Ad): Promise<void>
    findById(adId: string): Promise<Ad>
    delete(adId: string): Promise<void>
}
