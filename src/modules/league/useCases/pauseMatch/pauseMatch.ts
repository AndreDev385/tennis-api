import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { DoubleServeFlow } from "../../domain/doubleServeFlow";
import { Game } from "../../domain/game";
import { GameMode, Mode } from "../../domain/gameMode";
import { GamesPerSet } from "../../domain/gamesPerSet";
import { Match } from "../../domain/match";
import { MatchTracker } from "../../domain/matchTracker";
import { PausedMatch } from "../../domain/pausedMatch";
import { PlayerTracker } from "../../domain/playerTracker";
import { SingleServeFlow } from "../../domain/serviceFlow";
import { Set } from "../../domain/set";
import { SetQuantity } from "../../domain/setQuantity";
import { Sets } from "../../domain/sets";
import { Surface } from "../../domain/surface";
import { PlayerTrackerMapper } from "../../mappers/playerTrackerMap";
import { DoubleServeFlowMap } from "../../mappers/serveFlowMap";
import { SetMap } from "../../mappers/setMap";
import { MatchRepository } from "../../repositories/matchRepo";
import { PausedMatchRepository } from "../../repositories/pausedMatchRepo";
import { TrackerRepository } from "../../repositories/trackerRepo";
import { PauseMatchRequest } from "./dto";

type Response = Either<
    AppError.UnexpectedError | AppError.NotFoundError | Result<string>,
    Result<void>
>;

export class PauseMatch implements UseCase<PauseMatchRequest, Response> {
    private readonly matchRepo: MatchRepository;
    private readonly trackerRepo: TrackerRepository;
    private readonly pausedMatchRepo: PausedMatchRepository;

    constructor(
        matchRepo: MatchRepository,
        trackerRepo: TrackerRepository,
        pausedMatchRepo: PausedMatchRepository,
    ) {
        this.matchRepo = matchRepo;
        this.trackerRepo = trackerRepo;
        this.pausedMatchRepo = pausedMatchRepo;
    }

    async execute(request: PauseMatchRequest): Promise<Response> {
        let me: PlayerTracker | null;
        let partner: PlayerTracker | null = null;
        let match: Match;
        let tracker: MatchTracker;
        let pausedMatch: PausedMatch;

        let sets: Sets;
        let mode: Mode;
        let surface: Surface;
        let setsQuantity: SetQuantity;
        let gamesPerSet: GamesPerSet;
        let currentGame: Game;
        let singleServeFlow: SingleServeFlow | null = null
        let doubleServeFlow: DoubleServeFlow | null = null
        try {
            // sets
            console.log("REQUEST SETS", request.sets);
            const setsArr = request.sets.map((s) => SetMap.toDomain(s));

            for (const set of setsArr) {
                if (!!set == false) {
                    return left(Result.fail<string>("Set invalido"));
                }
            }

            sets = Sets.create(setsArr as Set[]);
            // end sets

            // check valid request
            const modeOrError = Mode.create({ value: request.mode });
            const surfaceOrError = Surface.create({ value: request.surface });
            const setsQuantityOrError = SetQuantity.create({
                value: request.setsQuantity,
            });
            const gamesPerSetOrError = GamesPerSet.create({
                value: request.gamesPerSet,
            });
            const gameOrError = Game.create(request.currentGame);

            const result = Result.combine([
                modeOrError,
                surfaceOrError,
                setsQuantityOrError,
                gamesPerSetOrError,
                gameOrError,
            ])

            if (result.isFailure) {
                return left(Result.fail<string>(`${result.getErrorValue()}`))
            }

            mode = modeOrError.getValue();
            surface = surfaceOrError.getValue();
            setsQuantity = setsQuantityOrError.getValue();
            gamesPerSet = gamesPerSetOrError.getValue();
            currentGame = gameOrError.getValue();

            if (mode.value == GameMode.single) {
                if (request.singleServeFlow) {
                    const singleServeFlowOrError = SingleServeFlow.create(request.singleServeFlow)
                    if (singleServeFlowOrError.isFailure) {
                        return left(Result.fail<string>(`${singleServeFlowOrError.getErrorValue()}`));
                    }
                    singleServeFlow = singleServeFlowOrError.getValue();
                }
            } else {
                if (request.doubleServeFlow) {
                    doubleServeFlow = DoubleServeFlowMap.toDomain(request.doubleServeFlow);
                    if (!doubleServeFlow) {
                        return left(Result.fail<string>("Flujo de doble servicio invalido"))
                    }
                }
            }
            // end check valid request

            me = PlayerTrackerMapper.toDomain(request.tracker.me);
            if (me == null) {
                return left(
                    Result.fail<string>("Estadisticas de jugador invalidas")
                );
            }
            if (request.tracker.partner) {
                partner = PlayerTrackerMapper.toDomain(request.tracker.partner);

                if (partner == null) {
                    return left(
                        Result.fail<string>(`Estadisticas de jugador invalidas`)
                    );
                }
            }
            try {
                match = await this.matchRepo.getMatchById(
                    request.tracker.matchId
                );
            } catch (error) {
                return left(new AppError.NotFoundError(error));
            }

            const trackerOrError = MatchTracker.create({
                ...request.tracker,
                me,
                partner,
                matchId: match.matchId,
            });

            if (trackerOrError.isFailure) {
                return left(
                    Result.fail<string>(`${trackerOrError.getErrorValue()}`)
                );
            }

            tracker = trackerOrError.getValue();

            const pausedMatchOrError = PausedMatch.create({
                mode,
                tracker,
                singleServeFlow,
                doubleServeFlow,
                matchId: match.matchId,
                gamesPerSet,
                sets,
                initialTeam: request.initialTeam,
                direction: request.direction,
                superTiebreak: request.superTiebreak,
                currentGame,
                setsQuantity,
                surface,
                player1: request.player1,
                player2: request.player2,
                player3: request.player3,
                player4: request.player4,
                setsWon: request.setsWon,
                matchWon: request.matchWon,
                setsLost: request.setsLost,
                statistics: request.statistics,
                matchFinish: request.matchFinish,
                currentSetIdx: request.currentSetIdx,
            })

            if (pausedMatchOrError.isFailure) {
                return left(Result.fail<string>(`${pausedMatchOrError.getErrorValue()}`));
            }

            pausedMatch = pausedMatchOrError.getValue();

            match.pauseMatch(tracker, sets, request.superTiebreak ?? false);

            await this.matchRepo.save(match);
            await this.trackerRepo.save(match.tracker!);
            await this.pausedMatchRepo.save(pausedMatch);

            return right(Result.ok<void>());
        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }
    }
}
