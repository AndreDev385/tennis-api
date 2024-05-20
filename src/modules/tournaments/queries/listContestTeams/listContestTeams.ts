import { AppError } from "../../../../shared/core/AppError";
import { Either, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import {
    ContestTeamQuery,
    ContestTeamRepository,
} from "../../repository/contestTeamRepo";

type Req = any;

type Res = Either<AppError.UnexpectedError, any>;

export class ListContestTeams implements UseCase<Req, Res> {
    private readonly repo: ContestTeamRepository;

    constructor(repo: ContestTeamRepository) {
        this.repo = repo;
    }
    async execute(request: Req): Promise<Res> {
        const validQueries: Array<keyof ContestTeamQuery> = [
            "contestId",
            "contestTeamId",
            "participantsIds",
            "name",
        ];

        const query: ContestTeamQuery = {};

        for (const [k, v] of Object.entries(request)) {
            if (validQueries.includes(k as any)) {
                query[k as keyof ContestTeamQuery] = v as any;
            }
        }

        try {
            const list = await this.repo.list(query);

            return right(
                list.map((t) => ({
                    contestTeamId: t.contestTeamId.id.toString(),
                    contestId: t.contestId.id.toString(),
                    partiticipantsIds: t.participantsIds
                        .getItems()
                        .map((r) => r.id.toString()),
                    name: t.name,
                }))
            );
        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }
    }
}
