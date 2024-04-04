import { AppError } from "../../../../shared/core/AppError";
import { Guard } from "../../../../shared/core/Guard";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { GamesPerSet } from "../../../league/domain/gamesPerSet";
import { SetQuantity } from "../../../league/domain/setQuantity";
import { Tournament } from "../../domain/tournament";
import { TournamentRules } from "../../domain/tournamentRules";
import { TournamentRepository } from "../../repository/tournamentRepo";
import { NewTournamentDto } from "./newTournamentDto";
import { TournamentStatus } from "../../domain/tournamentStatus";

type Response = Either<
    AppError.UnexpectedError | AppError.NotFoundError | Result<string>,
    Result<void>
>;

export class NewTournament implements UseCase<NewTournamentDto, Response> {
    private readonly tournametRepo: TournamentRepository;

    constructor(tournametRepo: TournamentRepository) {
        this.tournametRepo = tournametRepo;
    }

    async execute(req: NewTournamentDto): Promise<Response> {
        let rules: TournamentRules;
        let tournamet: Tournament;

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
                startDate: new Date(req.startDate),
                endDate: new Date(req.endDate),
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
