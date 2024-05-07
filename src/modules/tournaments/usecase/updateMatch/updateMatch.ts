import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { MatchStatuses } from "../../../league/domain/matchStatus";
import { Sets } from "../../../league/domain/sets";
import { GameMap } from "../../../league/mappers/gameMap";
import {
    DoubleServeFlowMap,
    SingleServeFlowMap,
} from "../../../league/mappers/serveFlowMap";
import { SetMap } from "../../../league/mappers/setMap";
import { MatchInfo } from "../../domain/matchInfo";
import { TournamentMatch } from "../../domain/tournamentMatch";
import { TournamentMatchTracker } from "../../domain/tournamentMatchTracker";
import { ParticipantTrackerMap } from "../../mapper/ParticipantTrackerMap";
import { TournamentMatchTrackerMap } from "../../mapper/TournamentMatchTrackerMap";
import { TournamentMatchRepo } from "../../repository/tournamentMatchRepo";
import { TournamentMatchTrackerRepo } from "../../repository/trackerRepo";
import { LiveReq, Req } from "./updateMatchDto";

type Response = Either<
    AppError.UnexpectedError | AppError.NotFoundError,
    Result<void>
>;

function isLiveReq(req: LiveReq): req is LiveReq {
    return req.status === 1;
}

export class UpdateMatch implements UseCase<Req | LiveReq, Response> {
    private readonly trackerRepo: TournamentMatchTrackerRepo;
    private readonly matchRepo: TournamentMatchRepo;

    constructor(
        matchRepo: TournamentMatchRepo,
        trackerRepo: TournamentMatchTrackerRepo
    ) {
        this.matchRepo = matchRepo;
        this.trackerRepo = trackerRepo;
    }

    async execute(request: Req | LiveReq): Promise<Response> {
        let match: TournamentMatch;

        try {
            const maybeMatch = await this.matchRepo.get({
                matchId: request.matchId,
            });

            if (maybeMatch.isFailure) {
                return left(
                    new AppError.NotFoundError(maybeMatch.getErrorValue())
                );
            }

            match = maybeMatch.getValue();

            if (isLiveReq(request)) {
                // live
                await this.live(match);
                return right(Result.ok());
            }
            // other states
            switch ((request as Req).status) {
                case MatchStatuses.Canceled:
                    await this.cancel(match, request);
                    break;

                case MatchStatuses.Finished:
                    await this.finish(match, request);
                    break;

                case MatchStatuses.Paused:
                    await this.pause(match, request);
                    break;
            }

            return right(Result.ok());
        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }
    }

    private async live(match: TournamentMatch) {
        if (!match.tracker) {
            const tracker = TournamentMatchTracker.newEmptyTracker({
                matchId: match.matchId,
                p1Id: match.player1.participantId,
                p2Id: match.player2.participantId,
                p3Id: match.player3?.participantId,
                p4Id: match.player4?.participantId,
                isDouble: match.player3 !== null,
                tournamentId: match.tournamentId,
            });

            match.addTracker(tracker);
        }

        match.goLive();
        await this.matchRepo.save(match);
    }

    private buildObjects(req: Req) {
        let matchInfo = MatchInfo.create({
            setsWon: req.setsWon!,
            setsLost: req.setsLost!,
            currentGame: GameMap.toDomain(req.currentGame),
            matchFinish: req.matchFinish!,
            initialTeam: req.initialTeam,
            currentSetIdx: req.currentSetIdx!,
            superTieBreak: req.superTieBreak,
            doubleServeFlow: DoubleServeFlowMap.toDomain(req.doubleServeFlow),
            singleServeFlow: SingleServeFlowMap.toDomain(req.singleServeFlow),
        }).getValue();

        req.tracker.player1 = ParticipantTrackerMap.toDomain(
            req.tracker.player1
        );
        req.tracker.player2 = ParticipantTrackerMap.toDomain(
            req.tracker.player2
        );
        req.tracker.player3 = ParticipantTrackerMap.toDomain(
            req.tracker.player3
        );
        req.tracker.player4 = ParticipantTrackerMap.toDomain(
            req.tracker.player4
        );

        return {
            matchInfo,
            sets: Sets.create(req.sets.map((s) => SetMap.toDomain(s)!)),
            tracker: TournamentMatchTrackerMap.toDomain(req.tracker),
            superTieBreak: req.superTieBreak,
            matchWon: req.matchWon,
        };
    }

    private async pause(match: TournamentMatch, req: Req) {
        const { tracker, matchInfo, sets, superTieBreak } =
            this.buildObjects(req);

        match.pauseMatch(tracker, sets, superTieBreak, matchInfo!);

        await this.trackerRepo.save(tracker);
        await this.matchRepo.save(match);
    }

    private async cancel(match: TournamentMatch, req: Req) {
        const { tracker, matchWon, sets, superTieBreak, matchInfo } =
            this.buildObjects(req);

        match.cancelMatch(sets, tracker, matchInfo, superTieBreak, matchWon);

        await this.trackerRepo.save(tracker);
        await this.matchRepo.save(match);
    }

    private async finish(match: TournamentMatch, req: Req) {
        const { tracker, matchWon, sets, superTieBreak, matchInfo } =
            this.buildObjects(req);

        match.finishMatch(sets, tracker, superTieBreak, matchWon, matchInfo);

        await this.trackerRepo.save(tracker);
        await this.matchRepo.save(match);
    }
}
