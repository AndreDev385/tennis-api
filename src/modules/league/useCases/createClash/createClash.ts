import { AppError } from "../../../../shared/core/AppError";
import { Guard } from "../../../../shared/core/Guard";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { Category } from "../../domain/category";
import { Club } from "../../domain/club";
import { ClubClash } from "../../domain/clubClash";
import { Matchs } from "../../domain/matchs";
import { Season } from "../../domain/season";
import { CategoryRepository } from "../../repositories/categoryRepo";
import { ClashRepository } from "../../repositories/clashRepo";
import { ClubRepository } from "../../repositories/clubRepo";
import { SeasonRepository } from "../../repositories/seasonRepo";
import { CreateClashDto } from "./createClashDto";

type Response = Either<
    AppError.UnexpectedError | AppError.NotFoundError | Result<string>,
    Result<void>
>;

export class CreateClashUseCase implements UseCase<CreateClashDto, Response> {
    clashRepo: ClashRepository;
    clubRepo: ClubRepository;
    categoryRepo: CategoryRepository;
    seasonRepo: SeasonRepository;

    constructor(
        clashRepo: ClashRepository,
        clubRepo: ClubRepository,
        categoryRepo: CategoryRepository,
        seasonRepo: SeasonRepository
    ) {
        this.clashRepo = clashRepo;
        this.clubRepo = clubRepo;
        this.categoryRepo = categoryRepo;
        this.seasonRepo = seasonRepo;
    }

    async execute(request: CreateClashDto): Promise<Response> {
        let club: Club;
        let rivalClub: Club;
        let host: Club;
        let category: Category;
        let season: Season;

        try {
            const guardResult = Guard.againstNullOrUndefinedBulk([
                { argument: request.host, argumentName: "anfitrion" },
                { argument: request.clubId, argumentName: "club id" },
                {
                    argument: request.rivalClubId,
                    argumentName: "id club rival",
                },
                { argument: request.journey, argumentName: "jornada" },
                { argument: request.categoryId, argumentName: "categoria" },
            ]);

            if (guardResult.isFailure) {
                return left(Result.fail(guardResult.getErrorValue())) as Response;
            }

            try {
                [club, rivalClub, host, category, season] = await Promise.all([
                    this.clubRepo.findById(request.clubId),
                    this.clubRepo.findById(request.rivalClubId),
                    this.clubRepo.findById(request.host),
                    this.categoryRepo.findById(request.categoryId),
                    this.seasonRepo.findById(request.seasonId),
                ]);
            } catch (error) {
                return left(new AppError.NotFoundError(error));
            }

            console.log(season.seasonId.id.toString(), "Season id")

            const clashOrError = ClubClash.create({
                clubId: club.clubId,
                rivalClubId: rivalClub.clubId,
                hostId: host.clubId,
                matchs: Matchs.create(),
                journey: request.journey,
                categoryId: category.categoryId,
                seasonId: season.seasonId,
            });

            if (clashOrError.isFailure) {
                return left(Result.fail(guardResult.getErrorValue())) as Response;
            }

            const clash = clashOrError.getValue();

            await this.clashRepo.save(clash);

            return right(Result.ok<void>());
        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }
    }
}
