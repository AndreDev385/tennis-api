import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { Clash } from "../../domain/clubClash";
import { ClashMap } from "../../mappers/clashMap";
import { ClashRepository } from "../../repositories/clashRepo";
import { GetClashByIdRequest } from "./dtos";

type Response = Either<AppError.UnexpectedError | AppError.NotFoundError | Result<string>, Result<any>>

export class GetClashById implements UseCase<any, Response> {

    clashRepo: ClashRepository;

    constructor(clashRepo: ClashRepository) {
        this.clashRepo = clashRepo;
    }

    async execute(request: GetClashByIdRequest): Promise<Response> {

        let clash: Clash;

        try {

            try {
                clash = await this.clashRepo.getClashById(request.clashId);
            } catch (error) {
                return left(new AppError.NotFoundError(error))
            }

            return right(Result.ok(ClashMap.toDto(clash)));
        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }
    }

}
