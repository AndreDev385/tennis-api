import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { Category } from "../../domain/category";
import { ClashId } from "../../domain/clashId";
import { Club } from "../../domain/club";
import { Clash } from "../../domain/clubClash";
import { Journey } from "../../domain/journey";
import { Matchs } from "../../domain/matchs";
import { Season } from "../../domain/season";
import { Team } from "../../domain/team";
import { CategoryRepository } from "../../repositories/categoryRepo";
import { ClashRepository } from "../../repositories/clashRepo";
import { ClubRepository } from "../../repositories/clubRepo";
import { SeasonRepository } from "../../repositories/seasonRepo";
import { TeamCreationService } from "../../services/teamCreation";
import { CreateClashDto } from "./createClashDto";
import { CreateClashErrors } from "./createClashError";

type Response = Either<
    | AppError.UnexpectedError
    | AppError.NotFoundError
    | CreateClashErrors.ClashAlreadyExistError
    | Result<string>,
    Result<ClashId>
>;

export class CreateClashUseCase implements UseCase<CreateClashDto, Response> {
    clashRepo: ClashRepository;
    clubRepo: ClubRepository;
    categoryRepo: CategoryRepository;
    seasonRepo: SeasonRepository;
    teamCreationServ: TeamCreationService;

    constructor(
        clashRepo: ClashRepository,
        clubRepo: ClubRepository,
        categoryRepo: CategoryRepository,
        seasonRepo: SeasonRepository,
        teamCreationServ: TeamCreationService
    ) {
        this.clashRepo = clashRepo;
        this.clubRepo = clubRepo;
        this.categoryRepo = categoryRepo;
        this.seasonRepo = seasonRepo;
        this.teamCreationServ = teamCreationServ;
    }

    async execute(request: CreateClashDto): Promise<Response> {
        let host: Club;
        let category: Category;
        let season: Season;
        let journey: Journey;

        let team1: Team;
        let team2: Team;
        let club1: Club;
        let club2: Club;
        try {
            const journeyOrError = Journey.create({ value: request.journey });

            if (journeyOrError.isFailure) {
                return left(Result.fail<string>("Jornada invalida"));
            }

            journey = journeyOrError.getValue();

            try {
                [host, category, season, club1, club2] = await Promise.all([
                    this.clubRepo.findById(request.host),
                    this.categoryRepo.findById(request.categoryId),
                    this.seasonRepo.currentSeason(),
                    this.clubRepo.findById(request.team1ClubId),
                    this.clubRepo.findById(request.team2ClubId),
                ]);
            } catch (error) {
                return left(new AppError.NotFoundError(error));
            }

            // team 1
            const team1Creation = await this.teamCreationServ.execute({
                teamName: request.team1Name,
                club: club1,
                category,
            })

            if (team1Creation.isLeft()) {
                return left(Result.fail<string>(team1Creation.value.getErrorValue()))
            }

            team1 = team1Creation.value.getValue();

            // team 2
            const team2Creation = await this.teamCreationServ.execute({
                teamName: request.team2Name,
                club: club2,
                category,
            })

            if (team2Creation.isLeft()) {
                return left(Result.fail<string>(team2Creation.value.getErrorValue()))
            }

            team2 = team2Creation.value.getValue();

            const clashOrError = Clash.create({
                clubId: team1.club.clubId,
                team1,
                team2,
                host,
                matchs: Matchs.create(),
                journey: journey,
                category: category,
                seasonId: season.seasonId,
            });

            if (clashOrError.isFailure) {
                return left(
                    Result.fail(`${clashOrError.getErrorValue()}`)
                ) as Response;
            }

            const clash = clashOrError.getValue();

            const alreadyCreated = await this.clashRepo.clashExist(
                team1.teamId.id.toString(),
                team2.teamId.id.toString(),
                journey.value,
                category.categoryId.id.toString(),
            );

            if (alreadyCreated) {
                return left(new CreateClashErrors.ClashAlreadyExistError());
            }

            await this.clashRepo.save(clash);

            return right(Result.ok<ClashId>(clash.clashId));
        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }
    }
}
