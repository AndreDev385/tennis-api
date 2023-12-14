import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { GameMode } from "../../domain/gameMode";
import { PlayerTracker } from "../../domain/playerTracker";
import { ClashRepository } from "../../repositories/clashRepo";
import { MatchRepository } from "../../repositories/matchRepo";
import { PlayerRepository } from "../../repositories/playerRepo";
import { FeaturePlayer, FeaturePlayersRecords, FeaturePlayersRequest } from "./dto";


type Response = Either<AppError.UnexpectedError, Result<any>>

export class FeaturePlayers implements UseCase<FeaturePlayersRequest, any> {

    private clashRepo: ClashRepository;
    private matchRepo: MatchRepository;
    private playerRepo: PlayerRepository;

    constructor(clashRepo: ClashRepository, matchRepo: MatchRepository, playerRepo: PlayerRepository) {
        this.clashRepo = clashRepo;
        this.matchRepo = matchRepo;
        this.playerRepo = playerRepo;
    }

    async execute(request: FeaturePlayersRequest): Promise<Response> {
        try {
            const query: any = { team1: request.teamId, isFinish: true };

            if (!!request.seasonId == true) {
                query['seasonId'] = request.seasonId;
            }

            if (!!request.journey == true) {
                query['journey'] = request.journey;
            }

            const clashList = await this.clashRepo.list(query);

            const playersRecord: FeaturePlayersRecords = {};

            for (const clash of clashList) {
                const matches = await this.matchRepo.getMatchsByClashId(clash.clashId.id.toString());

                for (const match of matches) {
                    updatePlayerRecord(playersRecord, match.tracker!.me);
                    if (match.mode.value == GameMode.double) {
                        updatePlayerRecord(playersRecord, match.tracker!.partner!);
                    }
                }

            }

            const featurePlayers: Array<FeaturePlayer> = [];

            for (const [key, value] of Object.entries(playersRecord)) {
                const player = await this.playerRepo.getPlayerById(key);

                featurePlayers.push({
                    playerId: key,
                    firstName: player.firstName.value,
                    lastName: player.lastName.value,
                    firstServIn: value.firstServIn,
                    secondServIn: value.secondServIn,
                    dobleFaults: value.dobleFaults,
                    pointsWinnedFirstServ: value.pointsWinnedFirstServ,
                    pointsWinnedSecondServe: value.pointsWinnedSecondServe,
                    meshPointsLost: value.meshPointsLost,
                    meshPointsWon: value.meshPointsWon,
                })
            }


            return right(Result.ok(featurePlayers));
        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }
    }
}

function updatePlayerRecord(records: FeaturePlayersRecords, playerStats: PlayerTracker) {
    if (!!playerStats as boolean == false) {
        return;
    }
    if (!records[playerStats.playerId.id.toString()]) {
        records[playerStats.playerId.id.toString()] = {
            meshPointsWon: playerStats.meshPointsWon,
            meshPointsLost: playerStats.meshPointsLost,
            firstServIn: playerStats.firstServIn,
            secondServIn: playerStats.secondServIn,
            dobleFaults: playerStats.dobleFaults,
            pointsWinnedFirstServ: playerStats.pointsWinnedFirstServ,
            pointsWinnedSecondServe: playerStats.pointsWinnedSecondServ,
        }
        return
    }
    records[playerStats.playerId.id.toString()].meshPointsWon += playerStats.meshPointsWon;
    records[playerStats.playerId.id.toString()].meshPointsLost += playerStats.meshPointsLost;
    records[playerStats.playerId.id.toString()].firstServIn += playerStats.firstServIn;
    records[playerStats.playerId.id.toString()].secondServIn += playerStats.secondServIn;
    records[playerStats.playerId.id.toString()].dobleFaults += playerStats.dobleFaults;
    records[playerStats.playerId.id.toString()].pointsWinnedFirstServ += playerStats.pointsWinnedFirstServ;
    records[playerStats.playerId.id.toString()].pointsWinnedSecondServe += playerStats.pointsWinnedSecondServ;
}


