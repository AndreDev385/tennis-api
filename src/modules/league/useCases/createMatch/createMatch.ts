import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { Clash } from "../../domain/clubClash";
import { GameMode, Mode } from "../../domain/gameMode";
import { GamesPerSet } from "../../domain/gamesPerSet";
import { Match } from "../../domain/match";
import { Matchs } from "../../domain/matchs";
import { Player } from "../../domain/player";
import { SetQuantity } from "../../domain/setQuantity";
import { Sets } from "../../domain/sets";
import { Surface } from "../../domain/surface";
import { CategoryRepository } from "../../repositories/categoryRepo";
import { ClashRepository } from "../../repositories/clashRepo";
import { MatchRepository } from "../../repositories/matchRepo";
import { PlayerRepository } from "../../repositories/playerRepo";
import { TrackerRepository } from "../../repositories/trackerRepo";
import { CreateClashMatchsDto } from "./createMatchDto";
import { CreateMatchsError } from "./createMatchError";

type Response = Either<
    | AppError.UnexpectedError
    | AppError.NotFoundError
    | CreateMatchsError.PlayerRepeated
    | Result<string>,
    Result<void>
>;

export class CreateMatch
    implements UseCase<CreateClashMatchsDto, Promise<Response>>
{
    matchRepo: MatchRepository;
    playerRepo: PlayerRepository;
    trackerRepo: TrackerRepository;
    clashRepo: ClashRepository;
    categoryRepo: CategoryRepository;

    constructor(
        matchRepo: MatchRepository,
        playerRepo: PlayerRepository,
        trackerRepo: TrackerRepository,
        clashRepo: ClashRepository
    ) {
        this.matchRepo = matchRepo;
        this.playerRepo = playerRepo;
        this.trackerRepo = trackerRepo;
        this.clashRepo = clashRepo;
    }

    async execute(request: CreateClashMatchsDto): Promise<Response> {

        let matchs: Array<Match> = [];
        let player1: Player;
        let player3: Player;
        let clash: Clash;

        const setsQuantity = SetQuantity.createLeagueDefault();
        const gamesPerSet = GamesPerSet.createLeagueDefault();
        const sets = Sets.createDefaultLeague();
        try {
            const surfaceOrError = Surface.create({ value: request.surface });

            if (surfaceOrError.isFailure) {
                return left(Result.fail<string>("Superficie invalida."));
            }

            const surface = surfaceOrError.getValue();

            try {
                clash = await this.clashRepo.getClashById(request.clashId);
            } catch (error) {
                return left(new AppError.NotFoundError(error));
            }

            if (clash.matchs.length != 0) {
                return left(
                    Result.fail<string>("Ya se han creado los partidos de este encuentro.")
                );
            }

            if (request.matchs.length !== 5) {
                return left(
                    Result.fail<string>("Numero de partidos invalido.")
                );
            }

            for (const matchData of request.matchs) {
                const modeOrError = Mode.create({ value: matchData.mode });
                if (modeOrError.isFailure) {
                    return left(
                        Result.fail<string>(`${modeOrError.getErrorValue()}`)
                    );
                }
                const mode = modeOrError.getValue();
                try {
                    player1 = await this.playerRepo.getPlayerById(
                        matchData.player1
                    );
                    if (matchData.mode == GameMode.double) {
                        player3 = await this.playerRepo.getPlayerById(
                            matchData.player3
                        );
                    }
                } catch (error) {
                    return left(new AppError.NotFoundError(error));
                }
                const createMatchOrError = Match.create({
                    player1,
                    player3: matchData.mode == GameMode.double ? player3 : null,
                    mode,
                    surface,
                    sets,
                    gamesPerSet,
                    clashId: clash.clashId,
                    player2: matchData.player2,
                    category: clash.category,
                    address: clash.host.name,
                    player4:
                        matchData.mode == GameMode.double
                            ? matchData.player4
                            : null,
                    setsQuantity,
                    superTieBreak: false,
                });

                if (createMatchOrError.isFailure) {
                    return left(
                        Result.fail<string>(
                            `${createMatchOrError.getErrorValue()}`
                        )
                    );
                }

                matchs.push(createMatchOrError.getValue());
            }

            try {
                clash.createMatchs(Matchs.create(matchs));
            } catch (error) {
                return left(new CreateMatchsError.PlayerRepeated(error));
            }

            await this.clashRepo.save(clash);

            return right(Result.ok<void>());
        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }
    }
}
