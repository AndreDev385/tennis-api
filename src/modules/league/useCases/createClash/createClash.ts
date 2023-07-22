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
import { TeamRepository } from "../../repositories/teamRepo";
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
    teamRepo: TeamRepository;

    constructor(
        clashRepo: ClashRepository,
        clubRepo: ClubRepository,
        categoryRepo: CategoryRepository,
        seasonRepo: SeasonRepository,
        teamRepo: TeamRepository
    ) {
        this.clashRepo = clashRepo;
        this.clubRepo = clubRepo;
        this.categoryRepo = categoryRepo;
        this.seasonRepo = seasonRepo;
        this.teamRepo = teamRepo;
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
                    this.seasonRepo.findById(request.seasonId),
                    this.clubRepo.findById(request.team1ClubId),
                    this.clubRepo.findById(request.team2ClubId),
                ]);
            } catch (error) {
                return left(new AppError.NotFoundError(error));
            }

            try {
                const existTeam1 = await this.teamRepo.getTeam(
                    request.team1Name,
                    request.team1ClubId
                );
                team1 = existTeam1;
                console.log(team1);
            } catch (error) {
                const teamOrError = Team.create({
                    name: request.team1Name,
                    club: club1,
                });
                if (teamOrError.isFailure) {
                    return left(Result.fail<string>("Equipo 1 invalido"));
                }
                team1 = teamOrError.getValue();
                await this.teamRepo.save(team1);
                console.log(team1);
            }

            try {
                const existTeam2 = await this.teamRepo.getTeam(
                    request.team2Name,
                    request.team2ClubId
                );
                team2 = existTeam2;
                console.log(team2);
            } catch (error) {
                const teamOrError = Team.create({
                    name: request.team2Name,
                    club: club2,
                });
                if (teamOrError.isFailure) {
                    return left(Result.fail<string>("Equipo 1 invalido"));
                }
                team2 = teamOrError.getValue();
                await this.teamRepo.save(team2);
                console.log(team2);
            }

            const clashOrError = Clash.create({
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
