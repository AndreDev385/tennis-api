import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { UniqueEntityID } from "../../../../shared/domain/UniqueEntityID";
import { Match } from "../../domain/match";
import { MatchTracker } from "../../domain/matchTracker";
import { PlayerTracker } from "../../domain/playerTracker";
import { Sets } from "../../domain/sets";
import { SetMap } from "../../mappers/setMap";
import { MatchRepository } from "../../repositories/matchRepo";
import { TrackerRepository } from "../../repositories/trackerRepo";
import { FinishMatchRequest } from "./finishMatchRequest";

type Response = Either<
    AppError.UnexpectedError | AppError.NotFoundError | Result<string>,
    Result<void>
>;

export class FinishMatch implements UseCase<any, Response> {
    private matchRepo: MatchRepository;
    private trackerRepo: TrackerRepository;

    constructor(matchRepo: MatchRepository, trackerRepo: TrackerRepository) {
        this.matchRepo = matchRepo;
        this.trackerRepo = trackerRepo;
    }

    async execute(request: FinishMatchRequest): Promise<Response> {
        let me: PlayerTracker;
        let partner: PlayerTracker;
        let match: Match;

        let sets: Sets;
        let tracker: MatchTracker;

        let updatedMatch: Match;

        try {
            const meOrError = PlayerTracker.create(
                { ...(request.tracker.me as any) },
                new UniqueEntityID(request.tracker.me.playerTrackerId)
            );
            if (request.tracker.partner) {
                const partnerOrError = PlayerTracker.create(
                    { ...(request.tracker.me as any) },
                    new UniqueEntityID(request.tracker.me.playerTrackerId)
                );

                if (partnerOrError.isFailure) {
                    return left(
                        Result.fail<string>(`${partnerOrError.getErrorValue()}`)
                    );
                }

                partner = partnerOrError.getValue();
            }

            try {
                match = await this.matchRepo.getMatchById(
                    request.tracker.matchId
                );
            } catch (error) {
                return left(new AppError.NotFoundError(error));
            }

            const result = Result.combine([meOrError]);

            if (result.isFailure) {
                return left(Result.fail(result.getErrorValue()));
            }

            const setsArr = request.sets.map((s) => SetMap.toDomain(s));

            for (const set of setsArr) {
                if (!!set == false) {
                    return left(Result.fail<string>("Sets invalidos"));
                }
            }

            sets = Sets.create(setsArr);
            me = meOrError.getValue();

            const trackerOrError = MatchTracker.create(
                {
                    ...request.tracker,
                    me,
                    partner,
                    matchId: match.matchId,
                },
                new UniqueEntityID(request.tracker.trackerId)
            );

            if (trackerOrError.isFailure) {
                return left(
                    Result.fail<string>(`${trackerOrError.getErrorValue()}`)
                );
            }

            tracker = trackerOrError.getValue();

            updatedMatch = Match.create(
                {
                    setsQuantity: match.setsQuantity,
                    player1: match.player1,
                    gamesPerSet: match.gamesPerSet,
                    surface: match.surface,
                    mode: match.mode,
                    clashId: match.clashId,
                    player2: match.player2,
                    category: match.category,
                    address: match.address,
                    player3: match.player3,
                    player4: match.player4,
                    superTieBreak: match.superTieBreak,
                    sets,
                    tracker,
                    isLive: false,
                    isFinish: true,
                },
                match.matchId.id
            ).getValue();

            await this.trackerRepo.save(tracker);
            await this.matchRepo.save(updatedMatch);

            return right(Result.ok<void>());
        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }
    }
}
