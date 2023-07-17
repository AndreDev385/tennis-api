import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { UniqueEntityID } from "../../../../shared/domain/UniqueEntityID";
import { Match } from "../../domain/match";
import { MatchTracker } from "../../domain/matchTracker";
import { PlayerTracker } from "../../domain/playerTracker";
import { Sets } from "../../domain/sets";
import { PlayerTrackerMapper } from "../../mappers/playerTrackerMap";
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

        try {
            me = PlayerTrackerMapper.toDomain(request.tracker.me);
            if (me == null) {
                return left(Result.fail<string>("Estadisticas de jugador invalidas"))
            }
            if (request.tracker.partner) {
                partner = PlayerTrackerMapper.toDomain(request.tracker.partner)

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

            const setsArr = request.sets.map((s) => SetMap.toDomain(s));

            for (const set of setsArr) {
                if (!!set == false) {
                    return left(Result.fail<string>("Sets invalidos"));
                }
            }

            sets = Sets.create(setsArr);

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

            match.finishMatch(sets, tracker);

            await this.trackerRepo.save(match.tracker);
            await this.matchRepo.save(match);

            return right(Result.ok<void>());
        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }
    }
}
