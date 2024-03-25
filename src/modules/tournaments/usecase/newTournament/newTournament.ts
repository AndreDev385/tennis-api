import { AppError } from "../../../../shared/core/AppError";
import { Guard } from "../../../../shared/core/Guard";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { Category } from "../../../league/domain/category";
import { GamesPerSet } from "../../../league/domain/gamesPerSet";
import { SetQuantity } from "../../../league/domain/setQuantity";
import { CategoryRepository } from "../../../league/repositories/categoryRepo";
import { Tournament } from "../../domain/tournament";
import { TournamentRules } from "../../domain/tournamentRules";
import { TournamentRepository } from "../../repository/tournamentRepo";
import { NewTournamentDto } from "./newTournamentDto";
import { Mode } from "../../../league/domain/gameMode";
import { TournamentStatus } from "../../domain/tournamentStatus";
import { CategoryTypes, Contest } from "../../domain/contest";
import { Contests } from "../../domain/contests";
import { Summation } from "../../domain/summation";

type Response = Either<
    AppError.UnexpectedError | AppError.NotFoundError | Result<string>,
    Result<void>
>;

export class NewTournament implements UseCase<NewTournamentDto, Response> {
    private readonly categoryRepo: CategoryRepository;
    private readonly tournametRepo: TournamentRepository;

    constructor(
        tournametRepo: TournamentRepository,
        categoryRepo: CategoryRepository
    ) {
        this.tournametRepo = tournametRepo;
        this.categoryRepo = categoryRepo;
    }

    async execute(req: NewTournamentDto): Promise<Response> {
        let rules: TournamentRules;
        let tournamet: Tournament;

        let contests: Contests;
        try {
            /* Validate data is present */
            const validInfo = Guard.againstNullOrUndefinedBulk([
                { argument: req.name, argumentName: "nombre" },
                {
                    argument: req.startDate,
                    argumentName: "Fecha inicial",
                },
                {
                    argument: req.setsQuantity,
                    argumentName: "Fecha final",
                },
                {
                    argument: req.setsQuantity,
                    argumentName: "cantidad de sets",
                },
                {
                    argument: req.gamesPerSet,
                    argumentName: "games por set",
                },
            ]);

            if (validInfo.isFailure) {
                return left(validInfo);
            }

            const mustSetsQty = SetQuantity.create({
                value: req.setsQuantity,
            });
            const mustGamesPerSet = GamesPerSet.create({
                value: req.gamesPerSet,
            });

            const combine = Result.combine([mustSetsQty, mustGamesPerSet]);

            if (combine.isFailure) {
                return left(combine);
            }

            const setQty = mustSetsQty.getValue();
            const gamesPerset = mustGamesPerSet.getValue();
            /* End Validate data is present */

            /* summation category or open */
            if (req.contests.length > 0) {
                let summation: Summation | null = null;
                let category: Category | null = null;
                let mode: Mode;

                let contestsArr: Array<Contest> = [];

                for (const dto of req.contests) {
                    if (dto.categoryType == CategoryTypes.SUMMATION) {
                        const mustSummation = Summation.create(dto.summation!);

                        if (mustSummation.isFailure) {
                            return left(
                                Result.fail<string>(
                                    `${mustSummation.getErrorValue()}`
                                )
                            );
                        }

                        summation = mustSummation.getValue();
                    }
                    if (dto.categoryType == CategoryTypes.CATEGORY) {
                        try {
                            category = await this.categoryRepo.findById(
                                dto.categoryId!
                            );
                        } catch (error) {
                            return left(new AppError.NotFoundError(error));
                        }
                    }

                    const mustMode = Mode.create({ value: dto.mode });
                    if (mustMode.isFailure) {
                        return left(
                            Result.fail<string>(`${mustMode.getErrorValue()}`)
                        );
                    }
                    mode = mustMode.getValue();

                    const mustContest = Contest.create({
                        mode,
                        categoryType: dto.categoryType,
                        category,
                        summation,
                    });

                    if (mustContest.isFailure) {
                        return left(
                            Result.fail<string>(
                                `${mustContest.getErrorValue()}`
                            )
                        );
                    }

                    contestsArr.push(mustContest.getValue());
                }
                contests = Contests.create(contestsArr);
            } else {
                contests = Contests.create();
            }
            /* end: summation or category */

            const mustRules = TournamentRules.create({
                gamesPerSet: gamesPerset!,
                setsQuantity: setQty,
            });

            if (mustRules.isFailure) {
                return left(
                    Result.fail<string>(`${mustRules.getErrorValue()}`)
                );
            }

            rules = mustRules.getValue();

            tournamet = Tournament.create({
                name: req.name,
                startDate: req.startDate,
                endDate: req.endDate,
                rules,
                contests,
                status: TournamentStatus.waiting(),
            }).getValue();

            await this.tournametRepo.save(tournamet);

            return right(Result.ok<void>());
        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }
    }
}
