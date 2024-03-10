import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { Clash } from "../../domain/clubClash";
import { ClashMap } from "../../mappers/clashMap";
import { ClashQuery, ClashRepository, PaginateQuery } from "../../repositories/clashRepo";

type Response = Either<AppError.UnexpectedError, Result<any>>;

export class PaginateClash implements UseCase<any, Response> {

    private readonly clashRepo: ClashRepository;

    constructor(clashRepo: ClashRepository) {
        this.clashRepo = clashRepo;
    }

    async execute(request: any): Promise<Response> {
        try {
            const query: ClashQuery & PaginateQuery = {};

            const validQueries = ["categoryId", "clubId", "isFinish", "journey", "seasonId"];

            for (const [key, value] of Object.entries(request)) {
                if (validQueries.includes(key)) {
                    query[key] = value;
                }
            }

            const result = await this.clashRepo.paginate(query, { offset: request.offset, limit: request.limit });

            result.rows = result.rows.map((r: Clash) => ClashMap.toDto(r));

            return right(Result.ok(result));
        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }
    }

}
