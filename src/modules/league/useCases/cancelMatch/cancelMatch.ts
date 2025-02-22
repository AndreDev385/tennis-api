import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { UniqueEntityID } from "../../../../shared/domain/UniqueEntityID";
import { Match } from "../../domain/match";
import { MatchTracker } from "../../domain/matchTracker";
import { PlayerTracker } from "../../domain/playerTracker";
import { Season } from "../../domain/season";
import { Set } from "../../domain/set";
import { Sets } from "../../domain/sets";
import { PlayerTrackerMapper } from "../../mappers/playerTrackerMap";
import { SeasonMap } from "../../mappers/seasonMap";
import { SetMap } from "../../mappers/setMap";
import { MatchRepository } from "../../repositories/matchRepo";
import { SeasonRepository } from "../../repositories/seasonRepo";
import { TrackerRepository } from "../../repositories/trackerRepo";
import { CancelMatchRequest } from "./dtos";

type Response = Either<
    AppError.UnexpectedError | AppError.NotFoundError | Result<string>,
    Result<void>
>;

export class CancelMatch implements UseCase<CancelMatchRequest, Response> {
    private matchRepo: MatchRepository;
    private trackerRepo: TrackerRepository;
    private seasonRepo: SeasonRepository;

    constructor(
        matchRepo: MatchRepository,
        trackerRepo: TrackerRepository,
        seasonRepo: SeasonRepository
    ) {
        this.matchRepo = matchRepo;
        this.trackerRepo = trackerRepo;
        this.seasonRepo = seasonRepo;
    }

    async execute(request: CancelMatchRequest): Promise<Response> {
        let currentSeason: Season;
        let me: PlayerTracker;
        let partner: PlayerTracker | null = null;
        let match: Match;

        let sets: Sets;
        let tracker: MatchTracker;

        try {
            try {
                const seasons = await this.seasonRepo.list({
                    isCurrentSeason: true,
                });
                if (seasons.length === 0) {
                    return left(
                        Result.fail<string>("No hay una temporada en curso")
                    );
                }
                currentSeason = SeasonMap.toDomain(seasons[0])!;
            } catch (error) {
                return left(new AppError.NotFoundError(error));
            }

            me = PlayerTrackerMapper.toDomain({
                ...request.tracker.me,
                seasonId: currentSeason.seasonId.id.toString(),
            })!;

            if (me == null) {
                return left(
                    Result.fail<string>("Estadisticas de jugador invalidas")
                );
            }

            if (request.tracker.partner) {
                partner = PlayerTrackerMapper.toDomain({
                    ...request.tracker.partner,
                    seasonId: currentSeason.id.toString(),
                })!;

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

            sets = Sets.create(setsArr as Array<Set>);

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

            match.cancelMatch(sets, tracker, request.superTieBreak, request.matchWon);

            await this.matchRepo.save(match);
            await this.trackerRepo.save(match.tracker!);

            return right(Result.ok<void>());
        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }
    }
}
