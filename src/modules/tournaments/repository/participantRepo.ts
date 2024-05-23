import {
    PaginateQuery,
    PaginateResponse,
} from "../../../shared/infra/database/sequelize/queries/sequelizeQueries";
import { Participant } from "../domain/participant";
import { ParticipantDto } from "../dtos/participantDto";

export type ParticipantQuery = {
    userId?: string;
    participantId?: string | string[];
};

export type ParticipantRepo = {
    paginate(
        q: ParticipantQuery,
        paginate: PaginateQuery
    ): Promise<PaginateResponse<ParticipantDto>>;
    get(q: ParticipantQuery): Promise<Participant>;
    save(p: Participant): Promise<void>;
};
