import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { BracketsQuery, BracketsRepository } from "../../repository/bracketsRepo";

type Response = Either<AppError.UnexpectedError, Result<void>>;

export class DeleteBrackets implements UseCase<any, Response> {
    private readonly repo: BracketsRepository;

    constructor(repo: BracketsRepository) {
        this.repo = repo;
    }

    async execute(request: any): Promise<Response> {

        let q: BracketsQuery = {};

        const validQueries: Array<keyof BracketsQuery> = ['id', 'deep', 'phase', 'contestId', 'matchId'];

        try {

            for (const [k, v] of Object.entries(request)) {
                if (validQueries.includes(k as keyof BracketsQuery)) {
                    q[k as keyof BracketsQuery] = v as any;
                }
            }

            await this.repo.delete(q);

            return right(Result.ok());
        } catch (e) {
            return left(new AppError.UnexpectedError(e));
        }
    }


}
