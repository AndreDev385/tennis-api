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
import { UploadImageServices } from "../../../league/services/uploadImageService";
import { MatchesPerClash } from "../../domain/matchesPerClash";

type Response = Either<
    AppError.UnexpectedError | AppError.NotFoundError | Result<string>,
    Result<void>
>;

export class NewTournament implements UseCase<NewTournamentDto, Response> {
    private readonly tournametRepo: TournamentRepository;
    private uploadImgService: UploadImageServices;

    constructor(
        tournametRepo: TournamentRepository,
        uploadImageService: UploadImageServices
    ) {
        this.tournametRepo = tournametRepo;
        this.uploadImgService = uploadImageService;
    }

    async execute(req: NewTournamentDto & { file: any }): Promise<Response> {
        let rules: TournamentRules;
        let tournamet: Tournament;
        let imgURL: string;

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
                {
                    argument: req.address,
                    argumentName: "direccion",
                },
                {
                    argument: req.matchesPerClash,
                    argumentName: "partidos por encuentro",
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
            const mustMatchesPerClash = MatchesPerClash.create({
                value: req.matchesPerClash,
            })

            const combine = Result.combine([mustSetsQty, mustGamesPerSet, mustMatchesPerClash]);

            if (combine.isFailure) {
                return left(combine);
            }

            const setQty = mustSetsQty.getValue();
            const gamesPerset = mustGamesPerSet.getValue();
            const matchesPerClash = mustMatchesPerClash.getValue();
            /* End Validate data is present */

            const mustRules = TournamentRules.create({
                gamesPerSet: gamesPerset!,
                setsQuantity: setQty,
                matchesPerClash: matchesPerClash,
            });

            if (mustRules.isFailure) {
                return left(
                    Result.fail<string>(`${mustRules.getErrorValue()}`)
                );
            }

            rules = mustRules.getValue();

            try {
                imgURL = await this.uploadImgService.upload(req.file.path);
            } catch (error) {
                console.log(error);
                return left(
                    Result.fail<string>(
                        "Ha ocurrido un error al subir el archivo"
                    )
                );
            }

            tournamet = Tournament.create({
                name: req.name,
                startDate: new Date(req.startDate),
                endDate: new Date(req.endDate),
                image: imgURL,
                address: req.address,
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
