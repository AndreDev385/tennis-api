import { User } from "../../users/domain/user";
import { Participant } from "../domain/participant";

export type NewParticipantRecord = {
    user?: User;
    participant: Participant;
};

export type BulkRegisterResponse = {
    rows: Participant[];
    errors: {
        error: string,
        ci: string,
    }[];
};

export type RegisterParticipantsRepository = {
    registerBulk(
        records: NewParticipantRecord[]
    ): Promise<BulkRegisterResponse>;
};
