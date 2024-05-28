import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { Category } from "../../../league/domain/category";
import { Mode } from "../../../league/domain/gameMode";
import { CategoryRepository } from "../../../league/repositories/categoryRepo";
import { CategoryTypes, Contest } from "../../domain/contest";
import { Summation } from "../../domain/summation";
import { Tournament } from "../../domain/tournament";
import { ContestRepository } from "../../repository/contestRepo";
import { TournamentRepository } from "../../repository/tournamentRepo";
import { AddTournamentContestDto } from "./addTournamentContestDto";

type Response = Either<
    AppError.UnexpectedError | AppError.NotFoundError | Result<string>,
    Result<void>
>;

export class AddTournamentContest
    implements UseCase<AddTournamentContestDto, Response>
{
    private readonly contestRepo: ContestRepository;
    private readonly tournamentRepo: TournamentRepository;
    private readonly categoryRepo: CategoryRepository;

    constructor(
        contestRepo: ContestRepository,
        tournamentRepo: TournamentRepository,
        categoryRepo: CategoryRepository
    ) {
        this.tournamentRepo = tournamentRepo;
        this.contestRepo = contestRepo;
        this.categoryRepo = categoryRepo;
    }

    async execute(req: AddTournamentContestDto): Promise<Response> {
        let contest: Contest;

        let summation: Summation | null = null;
        let category: Category | null = null;
        let mode: Mode;
        let tournament: Tournament;

        try {
            try {
                tournament = await this.tournamentRepo.get({
                    tournamentId: req.tournamentId,
                });
            } catch (error) {
                return left(new AppError.NotFoundError(error));
            }

            if (req.contest.categoryType == CategoryTypes.SUMMATION) {
                const mustSummation = Summation.create(req.contest.summation!);

                if (mustSummation.isFailure) {
                    return left(
                        Result.fail<string>(`${mustSummation.getErrorValue()}`)
                    );
                }

                summation = mustSummation.getValue();
            }
            if (req.contest.categoryType == CategoryTypes.CATEGORY) {
                try {
                    category = await this.categoryRepo.findById(
                        req.contest.categoryId!
                    );
                } catch (error) {
                    return left(new AppError.NotFoundError(error));
                }
            }

            const mustMode = Mode.create({ value: req.contest.mode });
            if (mustMode.isFailure) {
                return left(Result.fail<string>(`${mustMode.getErrorValue()}`));
            }
            mode = mustMode.getValue();

            const mustContest = Contest.create({
                tournamentId: tournament.tournamentId,
                mode,
                categoryType: req.contest.categoryType,
                category,
                summation,
            });

            if (mustContest.isFailure) {
                return left(
                    Result.fail<string>(`${mustContest.getErrorValue()}`)
                );
            }

            contest = mustContest.getValue();

            await this.contestRepo.save(contest);

            return right(Result.ok<void>());
        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }
    }
}
