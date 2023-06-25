import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { Category } from "../../domain/category";
import { Club } from "../../domain/club";
import { Clash } from "../../domain/clubClash";
import { Journey } from "../../domain/journey";
import { Matchs } from "../../domain/matchs";
import { Season } from "../../domain/season";
import { CategoryRepository } from "../../repositories/categoryRepo";
import { ClashRepository } from "../../repositories/clashRepo";
import { ClubRepository } from "../../repositories/clubRepo";
import { SeasonRepository } from "../../repositories/seasonRepo";
import { CreateClashDto } from "./createClashDto";

type Response = Either<
    AppError.UnexpectedError | AppError.NotFoundError | Result<any>,
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
        let journey: Journey;

        try {
            const journeyOrError = Journey.create({ value: request.journey });

            if (journeyOrError.isFailure) {
                return left(Result.fail<string>("Jornada invalida"));
            }

            journey = journeyOrError.getValue();

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

            console.log(season.seasonId.id.toString(), "Season id");

            const clashOrError = Clash.create({
                clubId: club.clubId,
                rivalClubId: rivalClub.clubId,
                hostId: host.clubId,
                matchs: Matchs.create(),
                journey: journey,
                categoryId: category.categoryId,
                seasonId: season.seasonId,
            });

            if (clashOrError.isFailure) {
                return left(
                    Result.fail(`${clashOrError.getErrorValue()}`)
                ) as Response;
            }

            const clash = clashOrError.getValue();

            await this.clashRepo.save(clash);

            return right(Result.ok<void>());
        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }
    }
}
