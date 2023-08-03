import { Ad } from "../domain/ad";

export interface AdRepository {
    list(): Promise<Array<Ad>>
    save(ad: Ad): Promise<void>
}
