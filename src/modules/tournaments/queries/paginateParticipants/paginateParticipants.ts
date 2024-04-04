import { AppError } from "../../../../shared/core/AppError";
import { Either, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { PaginateResponse } from "../../../../shared/infra/database/sequelize/queries/sequelizeQueries";
import { ParticipantDto } from "../../dtos/participantDto";
import {
    ParticipantQuery,
    ParticipantRepo,
} from "../../repository/participantRepo";

type Response = Either<
    AppError.UnexpectedError,
    PaginateResponse<ParticipantDto>
>;

export class PaginateParticipants implements UseCase<any, Response> {
    private readonly participantRepo: ParticipantRepo;

    constructor(repo: ParticipantRepo) {
        this.participantRepo = repo;
    }

    async execute(req: any): Promise<Response> {
        const validQueries: Array<keyof ParticipantQuery> = ["userId"];

        const query: ParticipantQuery = {};

        try {
            for (const [k, v] of Object.entries(req)) {
                if (validQueries.includes(k as keyof ParticipantQuery)) {
                    query[k as keyof ParticipantQuery] = v as any;
                }
            }

            const result = await this.participantRepo.paginate(query, {
                limit: req.limit,
                offset: req.offset,
            });

            return right(result);
        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }
    }
}
