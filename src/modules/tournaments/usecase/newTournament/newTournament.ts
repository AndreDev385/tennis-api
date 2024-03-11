import { AppError } from "../../../../shared/core/AppError";
import { Guard } from "../../../../shared/core/Guard";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { Category } from "../../../league/domain/category";
import { GamesPerSet } from "../../../league/domain/gamesPerSet";
import { SetQuantity } from "../../../league/domain/setQuantity";
import { CategoryRepository } from "../../../league/repositories/categoryRepo";
import { TeamsConfig } from "../../domain/teamsConfig";
import { Tournament } from "../../domain/tournament";
import { CategoryType, TournamentRules } from "../../domain/tournamentRules";
import { TournamentRepository } from "../../repository/tournamentRepo";
import { NewTournamentDto } from "./newTournamentDto";
import { Mode } from "../../../league/domain/gameMode";
import { TournamentStatus } from "../../domain/tournamentStatus";

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

        let category: Category;
        let summation: number;

        let teamsConfig: TeamsConfig;
        let mode: Mode;
        try {
            /* Validate data is present */
            const validInfo = Guard.againstNullOrUndefinedBulk([
                { argument: req.name, argumentName: "nombre" },
                {
                    argument: req.setsQuantity,
                    argumentName: "cantidad de sets",
                },
                {
                    argument: req.gamesPerSet,
                    argumentName: "games por set",
                },
                {
                    argument: req.categoryType,
                    argumentName: "tipo de categoria",
                },
                {
                    argument: req.isTeamClash,
                    argumentName: "encuentro en equipos",
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

            /* summation or category */
            if (req.categoryType == "summation") {
                summation = req.summation!;
            } else {
                try {
                    category = await this.categoryRepo.findById(
                        req.categoryId!
                    );
                } catch (error) {
                    return left(new AppError.NotFoundError(error));
                }
            }
            /* end: summation or category */

            /* tournamet by teams or single/double */
            if (req.isTeamClash) {
                const guard = Guard.againstNullOrUndefinedBulk([
                    {
                        argument: req.teamsConfig,
                        argumentName: "configuracion de partidos",
                    },
                    {
                        argument: req.teamsConfig?.doublesQty,
                        argumentName: "cantidad de dobles",
                    },
                    {
                        argument: req.teamsConfig?.matchesQty,
                        argumentName: "partidos",
                    },
                    {
                        argument: req.teamsConfig?.singlesQty,
                        argumentName: "cantidad de singles",
                    },
                ]);

                if (guard.isFailure) {
                    return left(guard);
                }

                if (
                    req.teamsConfig!.doublesQty +
                    req.teamsConfig!.singlesQty !=
                    req.teamsConfig?.matchesQty
                ) {
                    return left(
                        Result.fail<string>(
                            `La cantidad de singles y dobles no coincide con los partidos a jugar`
                        )
                    );
                }

                const mustTeamsConfig = TeamsConfig.create({
                    matchesQty: req.teamsConfig.matchesQty,
                    singlesQty: req.teamsConfig.singlesQty,
                    doublesQty: req.teamsConfig.doublesQty,
                });

                if (mustTeamsConfig.isFailure) {
                    return left(
                        Result.fail<string>(
                            `${mustTeamsConfig.getErrorValue()}`
                        )
                    );
                }

                teamsConfig = mustTeamsConfig.getValue();
            } else {
                const mustMode = Mode.create({ value: req.mode! });
                if (mustMode.isFailure) {
                    return left(
                        Result.fail<string>(`${mustMode.getErrorValue()}`)
                    );
                }

                mode = mustMode.getValue();
            }
            /* end tournamet by teams or single/double */

            const mustRules = TournamentRules.create({
                mode: mode!,
                teamsConfig: teamsConfig!,
                summation: summation!,
                gamesPerSet: gamesPerset!,
                categoryType: req.categoryType as CategoryType,
                setsQuantity: setQty,
                isTeamClash: req.isTeamClash,
                category: category!,
            });

            if (mustRules.isFailure) {
                return left(
                    Result.fail<string>(`${mustRules.getErrorValue()}`)
                );
            }

            rules = mustRules.getValue();

            tournamet = Tournament.create({
                name: req.name,
                rules,
                status: TournamentStatus.waiting(),
            }).getValue();

            await this.tournametRepo.save(tournamet);

            return right(Result.ok<void>());
        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }
    }
}
