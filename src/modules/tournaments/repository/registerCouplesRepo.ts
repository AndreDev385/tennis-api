import { User } from "../../users/domain/user";
import { Couple } from "../domain/couple";
import { Participant } from "../domain/participant";

export type NewCoupleRecord = {
    user1?: User;
    participant1?: Participant;
    user2?: User;
    participant2?: Participant;
    couple: Couple | null;
};

export type BulkRegisterResponse = {
    rows: Couple[];
    errors: {
        error: string,
        coupleId: string,
    }[];
};

export type RegisterCouplesRepository = {
    registerBulk(
        records: NewCoupleRecord[]
    ): Promise<BulkRegisterResponse>;
};
