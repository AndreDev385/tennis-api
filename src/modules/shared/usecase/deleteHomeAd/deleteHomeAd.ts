import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { HomeAdRepository } from "../../repository/homeAdRepo";

type Req = string;

type Res = Either<
    AppError.UnexpectedError | AppError.NotFoundError,
    Result<void>
>;

export class DeleteHomeAd implements UseCase<Req, Res> {
    private readonly homeAdRepo: HomeAdRepository;

    constructor(repo: HomeAdRepository) {
        this.homeAdRepo = repo;
    }
    async execute(request: string): Promise<Res> {
        try {
            try {
                await this.homeAdRepo.delete(request);
            } catch (error) {
                return left(new AppError.NotFoundError(error));
            }

            return right(Result.ok());
        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }
    }
}
