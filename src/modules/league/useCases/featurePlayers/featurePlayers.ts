import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { GameMode } from "../../domain/gameMode";
import { PlayerTracker } from "../../domain/playerTracker";
import { ClashRepository } from "../../repositories/clashRepo";
import { MatchRepository } from "../../repositories/matchRepo";
import { PlayerRepository } from "../../repositories/playerRepo";
import { SeasonRepository } from "../../repositories/seasonRepo";
import {
    FeaturePlayer,
    FeaturePlayerKeys,
    FeaturePlayerStats,
    FeaturePlayersRecords,
    FeaturePlayersRequest,
} from "./dto";

type Response = Either<
    AppError.UnexpectedError | Result<string>,
    Result<Array<FeaturePlayer>>
>;

export class FeaturePlayers implements UseCase<FeaturePlayersRequest, any> {
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

    async execute(request: FeaturePlayersRequest): Promise<Response> {
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

            const playersRecord: FeaturePlayersRecords = {};

            for (const clash of clashList) {
                const matches = await this.matchRepo.getMatchsByClashId(
                    clash.clashId.id.toString()
                );

                for (const match of matches) {
                    updatePlayerRecord(
                        playersRecord,
                        match.tracker!.me,
                        request.isDouble ?? true
                    );
                    if (match.mode.value == GameMode.double) {
                        updatePlayerRecord(
                            playersRecord,
                            match.tracker!.partner!,
                            request.isDouble ?? true
                        );
                    }
                }
            }

            const featurePlayers: Array<FeaturePlayer> = [];

            for (const [key, value] of Object.entries(playersRecord)) {
                const player = await this.playerRepo.getPlayerById(key);

                const statsRecord: FeaturePlayerStats =
                    {} as FeaturePlayerStats;

                for (const k of keys) {
                    statsRecord[k] = value[k];
                }

                featurePlayers.push({
                    playerId: key,
                    firstName: player.firstName.value,
                    lastName: player.lastName.value,
                    ...statsRecord,
                });
            }

            return right(Result.ok(featurePlayers));
        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }
    }
}

const keys: Array<FeaturePlayerKeys> = [
    "saveBreakPtsChances",
    "breakPtsSaved",
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
];

function updatePlayerRecord(
    records: FeaturePlayersRecords,
    playerStats: PlayerTracker,
    isDouble: boolean
) {
    if ((!!playerStats as boolean) == false) return;

    if (
        (playerStats.isDouble && !isDouble) ||
        (!playerStats.isDouble && isDouble)
    )
        return;

    if (!records[playerStats.playerId.id.toString()]) {
        const newRecord = {} as FeaturePlayerStats;

        for (const key of keys) {
            newRecord[key] = playerStats[key];
        }

        records[playerStats.playerId.id.toString()] = newRecord;
        return;
    }

    for (const key of keys) {
        records[playerStats.playerId.id.toString()][key] += playerStats[key];
    }
}
