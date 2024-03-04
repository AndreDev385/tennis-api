import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { GameMode } from "../../domain/gameMode";
import { MatchTracker } from "../../domain/matchTracker";
import { ClashRepository } from "../../repositories/clashRepo";
import { MatchRepository } from "../../repositories/matchRepo";
import { PlayerRepository } from "../../repositories/playerRepo";
import { SeasonRepository } from "../../repositories/seasonRepo";
import {
    FeatureCoupleRecords,
    FeatureCoupleStats,
    CoupleStatsKeys,
    FeatureCouple,
} from "./dto";

type Response = Either<
    AppError.UnexpectedError | Result<string>,
    Result<Array<FeatureCoupleStats>>
>;

export class FeatureCouples implements UseCase<any, any> {
    private clashRepo: ClashRepository;
    private matchRepo: MatchRepository;
    private playerRepo: PlayerRepository;
    private seasonRepo: SeasonRepository;

    constructor(
        clashRepo: ClashRepository,
        matchRepo: MatchRepository,
        playerRepo: PlayerRepository,
        seasonRepo: SeasonRepository
    ) {
        this.clashRepo = clashRepo;
        this.matchRepo = matchRepo;
        this.playerRepo = playerRepo;
        this.seasonRepo = seasonRepo;
    }

    async execute(request: any): Promise<Response> {
        try {
            if (!request.teamId || typeof request.teamId != "string") {
                return left(Result.fail<string>("Ingresa un id de equipo"));
            }

            const query: any = { team1: request.teamId, isFinish: true };

            if (!!request.seasonId == true) {
                query["seasonId"] = request.seasonId;
            } else {
                const season = await this.seasonRepo.currentSeason();
                query["seasonId"] = season.seasonId.id.toString();
            }

            if (!!request.journey == true) {
                query["journey"] = request.journey;
            }

            const clashList = await this.clashRepo.list(query);

            const couplesRecord: FeatureCoupleRecords = {};

            for (const clash of clashList) {
                const matches = await this.matchRepo.getMatchsByClashId(
                    clash.clashId.id.toString()
                );

                for (const match of matches) {
                    if (match.mode.value == GameMode.double) {
                        updateCoupleRecord(couplesRecord, match.tracker!);
                    }
                }
            }

            const featureCouples: Array<FeatureCouple> = [];

            for (const [key, value] of Object.entries(couplesRecord)) {
                const [playerId, partnerId] = key.split(" ");
                const player = await this.playerRepo.getPlayerById(playerId);
                const partner = await this.playerRepo.getPlayerById(partnerId);

                const statsRecord = {} as FeatureCoupleStats;

                for (const k of keys) {
                    statsRecord[k] = value[k];
                }

                featureCouples.push({
                    player: {
                        firstName: player.firstName.value,
                        lastName: player.lastName.value,
                    },
                    partner: {
                        firstName: partner.firstName.value,
                        lastName: partner.lastName.value,
                    },
                    ...statsRecord,
                });
            }

            return right(Result.ok(featureCouples));
        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }
    }
}

const keys: Array<CoupleStatsKeys> = [
    "gamesWonServing",
    "gamesLostServing",
    "pointsWinnedFirstServ",
    "pointsWinnedSecondServ",
    "firstServIn",
    "secondServIn",
    "firstServWon",
    "secondServWon",
    "aces",
    "dobleFaults",
    "pointsWinnedFirstReturn",
    "pointsWinnedSecondReturn",
    "firstReturnIn",
    "secondReturnIn",
    "firstReturnOut",
    "secondReturnOut",
    "firstReturnWon",
    "secondReturnWon",
    "firstReturnWinner",
    "secondReturnWinner",
    "meshPointsWon",
    "meshPointsLost",
    "meshWinner",
    "meshError",
    "bckgPointsWon",
    "bckgPointsLost",
    "bckgWinner",
    "bckgError",
    //couple
    "gamesWonReturning",
    "gamesLostReturning",
    "winBreakPtsChances",
    "breakPtsWinned",

    "shortRallyWon",
    "mediumRallyWon",
    "longRallyWon",
    "shortRallyLost",
    "mediumRallyLost",
    "longRallyLost",
];

function updateCoupleRecord(
    records: FeatureCoupleRecords,
    tracker: MatchTracker
) {
    if (!tracker.me || !tracker.partner) return;
    const coupleId = `${tracker.me.playerId.id.toString()} ${tracker.partner.playerId.id.toString()}`;

    const [playerId, partnerId] = coupleId.split(" ");

    const reversedCoupleId = `${partnerId} ${playerId}`;

    // check for same couple with diferent order
    if (
        (!!records[coupleId] as boolean) == false &&
        (!!records[reversedCoupleId] as boolean) == false
    ) {
        const newRecord = {} as FeatureCoupleStats;

        for (const key of keys) {
            newRecord[key] = tracker[key];
        }

        records[coupleId] = newRecord;
        return;
    }

    for (const key of keys) {
        if ((!!records[coupleId] as boolean) != false) {
            records[coupleId][key] += tracker[key];
        } else {
            records[reversedCoupleId][key] += tracker[key];
        }
    }
}
