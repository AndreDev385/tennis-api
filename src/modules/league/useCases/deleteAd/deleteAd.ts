import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { AdRepository } from "../../repositories/adRepo";
import { DeleteAdRequest } from "./dto";

type Response = Either<AppError.NotFoundError | AppError.UnexpectedError, Result<void>>;

export class DeleteAd implements UseCase<DeleteAdRequest, Response> {

    private readonly adRepo: AdRepository;

    constructor(adRepo: AdRepository) {
        this.adRepo = adRepo;
    }

    async execute(request: DeleteAdRequest): Promise<Response> {

        try {

            try {
                await this.adRepo.delete(request.adId);
            } catch (error) {
                return left(new AppError.NotFoundError(error));
            }

            return right(Result.ok<void>());
        } catch (error) {
            return left(new AppError.UnexpectedError(error))
        }
    }

}
