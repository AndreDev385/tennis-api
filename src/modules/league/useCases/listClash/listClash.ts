import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { ClashMap } from "../../mappers/clashMap";
import { ClashRepository } from "../../repositories/clashRepo";

type Response = Either<AppError.UnexpectedError, Result<any>>;

export class ListClash implements UseCase<any, Promise<Response>> {
    clashRepo: ClashRepository;

    constructor(clashRepo: ClashRepository) {
        this.clashRepo = clashRepo;
    }

    async execute(request?: any): Promise<Response> {
        try {
            const list = await this.clashRepo.list(request);
            console.log(list);

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
