import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { Clash } from "../../domain/clubClash";
import { Match } from "../../domain/match";
import { MatchTracker } from "../../domain/matchTracker";
import { ClashRepository } from "../../repositories/clashRepo";
import { MatchRepository } from "../../repositories/matchRepo";
import { TrackerRepository } from "../../repositories/trackerRepo";
import { GoMatchLiveRequest } from "./goMatchLiveRequest";

type Response = Either<AppError.UnexpectedError | Result<string>, Result<void>>;

export class GoMatchLive
    implements UseCase<GoMatchLiveRequest, Promise<Response>>
{
    matchRepo: MatchRepository;
    trackerRepo: TrackerRepository;
    clashRepo: ClashRepository;

    constructor(matchRepo: MatchRepository, trackerRepo: TrackerRepository, clashRepo: ClashRepository) {
        this.matchRepo = matchRepo;
        this.trackerRepo = trackerRepo;
        this.clashRepo = clashRepo
    }

    async execute(request: GoMatchLiveRequest): Promise<Response> {
        let match: Match;
        let tracker: MatchTracker;
        let clash: Clash;

        try {
            try {
                match = await this.matchRepo.getMatchById(request.matchId);
                console.log(match.tracker, 'Tracker')
            } catch (error) {
                return left(new AppError.NotFoundError(error));
            }

            try {
                clash = await this.clashRepo.getClashById(match.clashId.id.toString())
            } catch (error) {
                return left(new AppError.NotFoundError(error));
            }

            if (match.isLive) {
                return left(Result.fail<string>("El partido ya se encuentra en vivo"))
            }

            if (match.tracker === null) {
                const trackerOrError = MatchTracker.createNewTracker(
                    match.matchId,
                    clash.seasonId,
                    match.player1.playerId,
                    match.player3?.playerId
                );

                if (trackerOrError.isFailure) {
                    return left(
                        Result.fail<string>(`${trackerOrError.getErrorValue()}`)
                    );
                }
                tracker = trackerOrError.getValue();
                match.addTracker(tracker);
            }

            match.goLive();

            await this.trackerRepo.save(match.tracker);
            await this.matchRepo.save(match);

            return right(Result.ok<void>());
        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }
    }
}
