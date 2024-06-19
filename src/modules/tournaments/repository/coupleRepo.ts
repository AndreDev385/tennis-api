import { Couple } from "../domain/couple";

export type CoupleQuery = {
    coupleId?: string;
    participantsId?: {
        p1Id: string,
        p2Id: string,
    }
}

export type CoupleRepository = {
    get(q: CoupleQuery): Promise<Couple>
    save(couple: Couple): Promise<void>
}
