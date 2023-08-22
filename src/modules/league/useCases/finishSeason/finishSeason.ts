import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { Season } from "../../domain/season";
import { SeasonRepository } from "../../repositories/seasonRepo";

type Response = Either<
    AppError.UnexpectedError | AppError.NotFoundError,
    Result<void>
>;

export class FinishSeason implements UseCase<any, Response> {
    private seasonRepo: SeasonRepository;

    constructor(seasonRepo: SeasonRepository) {
        this.seasonRepo = seasonRepo;
    }

    async execute(): Promise<Response> {
        let season: Season;
        try {
            try {
                season = await this.seasonRepo.currentSeason();
            } catch (error) {
                return left(new AppError.NotFoundError(error));
            }

            season.finishSeason();

            await this.seasonRepo.save(season);

            return right(Result.ok<void>());
        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }
    }
}
