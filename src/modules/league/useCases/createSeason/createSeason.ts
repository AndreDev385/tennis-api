import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { UniqueEntityID } from "../../../../shared/domain/UniqueEntityID";
import { LeagueId } from "../../domain/leagueId";
import { Season } from "../../domain/season";
import { SeasonRepository } from "../../repositories/seasonRepo";
import { CreateSeasonDto } from "./dto";

type Response = Either<AppError.UnexpectedError | Result<string>, Result<void>>;

export class CreateSeason implements UseCase<any, any> {
    private seasonRepo: SeasonRepository;

    constructor(seasonRepo: SeasonRepository) {
        this.seasonRepo = seasonRepo;
    }

    async execute(request: CreateSeasonDto): Promise<Response> {
        let season: Season;

        try {
            try {
                const currentSeason = this.seasonRepo.currentSeason();

                if (!!currentSeason == true) {
                    return left(
                        Result.fail<string>("Existe una temporada en curso")
                    );
                }
            } catch (error) {}

            const seasonOrError = Season.create({
                leagueId: LeagueId.create(
                    new UniqueEntityID(request.leagueId)
                ).getValue(),
                name: request.name,
            });

            if (seasonOrError.isFailure) {
                return left(
                    Result.fail<string>(`${seasonOrError.getErrorValue()}`)
                );
            }

            season = seasonOrError.getValue();

            await this.seasonRepo.save(season);

            return right(Result.ok<void>());
        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }
    }
}
