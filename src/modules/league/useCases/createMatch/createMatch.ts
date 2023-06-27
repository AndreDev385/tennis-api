import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { Category } from "../../domain/category";
import { Clash } from "../../domain/clubClash";
import { GameMode, Mode } from "../../domain/gameMode";
import { GamesPerSet } from "../../domain/gamesPerSet";
import { Match } from "../../domain/match";
import { MatchTracker } from "../../domain/matchTracker";
import { Player } from "../../domain/player";
import { SetQuantity } from "../../domain/setQuantity";
import { Sets } from "../../domain/sets";
import { Surface } from "../../domain/surface";
import { CategoryRepository } from "../../repositories/categoryRepo";
import { ClashRepository } from "../../repositories/clashRepo";
import { MatchRepository } from "../../repositories/matchRepo";
import { PlayerRepository } from "../../repositories/playerRepo";
import { TrackerRepository } from "../../repositories/trackerRepo";
import { CreateMatchDto } from "./createMatchDto";

type Response = Either<
    AppError.UnexpectedError | AppError.NotFoundError | Result<string>,
    Result<any>
>;

export class CreateMatch implements UseCase<CreateMatchDto, Promise<Response>> {
    matchRepo: MatchRepository;
    playerRepo: PlayerRepository;
    trackerRepo: TrackerRepository;
    clashRepo: ClashRepository;
    categoryRepo: CategoryRepository;

    constructor(
        matchRepo: MatchRepository,
        playerRepo: PlayerRepository,
        trackerRepo: TrackerRepository,
        clashRepo: ClashRepository,
        categoryRepo: CategoryRepository
    ) {
        this.matchRepo = matchRepo;
        this.playerRepo = playerRepo;
        this.trackerRepo = trackerRepo;
        this.clashRepo = clashRepo;
        this.categoryRepo = categoryRepo;
    }

    async execute(request: CreateMatchDto): Promise<Response> {
        let category: Category;
        let player1: Player;
        let player3: Player;
        let clash: Clash;

        let match: Match;
        let tracker: MatchTracker;

        try {
            const setQuantityOrError = SetQuantity.create({
                value: request.setsQuantity,
            });
            const gamesPerSetOrError = GamesPerSet.create({
                value: request.gamesPerSet,
            });
            const surfaceOrError = Surface.create({ value: request.surface });
            const modeOrError = Mode.create({ value: request.mode });

            const result = Result.combine([
                setQuantityOrError,
                gamesPerSetOrError,
                surfaceOrError,
                modeOrError,
            ]);

            if (result.isFailure) {
                return left(Result.fail<string>(result.getErrorValue()));
            }

            try {
                [player1, category, clash] = await Promise.all([
                    this.playerRepo.getPlayerById(request.player1),
                    this.categoryRepo.findById(request.categoryId),
                    this.clashRepo.getClashById(request.clashId),
                ]);

                if (request.mode == GameMode.double) {
                    player3 = await this.playerRepo.getPlayerById(
                        request.player3
                    );
                }
            } catch (error) {
                return left(new AppError.NotFoundError(error));
            }

            const matchOrError = Match.create({
                clashId: clash.clashId,
                mode: modeOrError.getValue(),
                category,
                player3,
                surface: surfaceOrError.getValue(),
                player1,
                gamesPerSet: gamesPerSetOrError.getValue(),
                setsQuantity: setQuantityOrError.getValue(),
                sets: Sets.create(),
                player2: request.player2,
                address: request.address,
                player4: request.player4,
                superTieBreak: request.superTieBreak,
            });

            if (matchOrError.isFailure) {
                return left(
                    Result.fail<string>(`${matchOrError.getErrorValue()}`)
                );
            }

            match = matchOrError.getValue();

            const trackerOrError = MatchTracker.createNewTracker(
                match.matchId,
                player1.playerId,
                player3?.playerId
            );

            if (trackerOrError.isFailure) {
                return left(
                    Result.fail<string>(`${trackerOrError.getErrorValue()}`)
                );
            }

            tracker = trackerOrError.getValue();

            match.addTracker(tracker);

            await this.matchRepo.save(match);

            return right(Result.ok<void>());
        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }
    }
}
