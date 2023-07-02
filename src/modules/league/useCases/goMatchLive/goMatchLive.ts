import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { Match } from "../../domain/match";
import { MatchTracker } from "../../domain/matchTracker";
import { MatchRepository } from "../../repositories/matchRepo";
import { TrackerRepository } from "../../repositories/trackerRepo";
import { GoMatchLiveRequest } from "./goMatchLiveRequest";

type Response = Either<AppError.UnexpectedError | Result<string>, Result<void>>;

export class GoMatchLive
    implements UseCase<GoMatchLiveRequest, Promise<Response>>
{
    matchRepo: MatchRepository;
    trackerRepo: TrackerRepository;

    constructor(matchRepo: MatchRepository, trackerRepo: TrackerRepository) {
        this.matchRepo = matchRepo;
        this.trackerRepo = trackerRepo;
    }

    async execute(request: GoMatchLiveRequest): Promise<Response> {
        let match: Match;
        let tracker: MatchTracker;

        try {
            try {
                match = await this.matchRepo.getMatchById(request.matchId);
            } catch (error) {
                return left(new AppError.NotFoundError(error));
            }

            const trackerOrError = MatchTracker.createNewTracker(
                match.matchId,
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
            match.goLive();

            await this.trackerRepo.save(tracker);
            await this.matchRepo.save(match);

            return right(Result.ok<void>());
        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }
    }
}
