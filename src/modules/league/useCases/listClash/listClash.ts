import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { ClashMap } from "../../mappers/clashMap";
import { ClashQuery, ClashRepository } from "../../repositories/clashRepo";

type Response = Either<AppError.UnexpectedError, Result<any>>;

export class ListClash implements UseCase<any, Promise<Response>> {
    clashRepo: ClashRepository;

    constructor(clashRepo: ClashRepository) {
        this.clashRepo = clashRepo;
    }

    async execute(request?: any): Promise<Response> {
        try {
            const query: ClashQuery = {};

            for (const [key, value] of Object.entries(request)) {
                if (key == "categoryId") {
                    query.categoryId = value as string;
                }
                if (key == "isFinish") {
                    query.isFinish = value as boolean;
                }
            }

            const list = await this.clashRepo.list(query);

            const dtoList = list.map((clash) => {
                const obj = ClashMap.toDto(clash);
                delete obj.matchs;

                return obj;
            });

            return right(Result.ok(dtoList));
        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }
    }
}
