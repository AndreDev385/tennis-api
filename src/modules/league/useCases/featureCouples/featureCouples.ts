import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { GameMode } from "../../domain/gameMode";
import { MatchTracker } from "../../domain/matchTracker";
import { ClashRepository } from "../../repositories/clashRepo";
import { MatchRepository } from "../../repositories/matchRepo";
import { PlayerRepository } from "../../repositories/playerRepo";
import { FeatureCoupleRecords, FeatureCoupleObj } from "./dto";

type Response = Either<AppError.UnexpectedError, Result<any>>;

export class FeatureCouples implements UseCase<any, any> {

    private clashRepo: ClashRepository;
    private matchRepo: MatchRepository;
    private playerRepo: PlayerRepository;

    constructor(clashRepo: ClashRepository, matchRepo: MatchRepository, playerRepo: PlayerRepository) {
        this.clashRepo = clashRepo;
        this.matchRepo = matchRepo;
        this.playerRepo = playerRepo;
    }

    async execute(request: any): Promise<Response> {

        try {
            const query = { team1: request.teamId, isFinish: true };

            if (!!request.seasonId == true) {
                query['seasonId'] = request.seasonId;
            }

            if (!!request.journey == true) {
                query['journey'] = request.journey;
            }

            const clashList = await this.clashRepo.list(query);

            const couplesRecord: FeatureCoupleRecords = {};

            for (const clash of clashList) {
                const matches = await this.matchRepo.getMatchsByClashId(clash.clashId.id.toString());

                for (const match of matches) {
                    if (match.mode.value == GameMode.double) {
                        updateCoupleRecord(couplesRecord, match.tracker);
                    }
                }

            }

            const featureCouples: Array<FeatureCoupleObj> = [];

            for (const [key, value] of Object.entries(couplesRecord)) {
                const [playerId, partnerId] = key.split(' ');
                const player = await this.playerRepo.getPlayerById(playerId);
                const partner = await this.playerRepo.getPlayerById(partnerId);

                featureCouples.push({
                    player: {
                        firstName: player.firstName.value,
                        lastName: player.lastName.value,
                    },
                    partner: {
                        firstName: partner.firstName.value,
                        lastName: partner.lastName.value,
                    },
                    firstServIn: value.firstServIn,
                    secondServIn: value.secondServIn,
                    dobleFaults: value.dobleFaults,
                    pointsWinnedFirstServ: value.pointsWinnedFirstServ,
                    pointsWinnedSecondServe: value.pointsWinnedSecondServe,
                    meshPointsLost: value.meshPointsLost,
                    meshPointsWon: value.meshPointsWon,
                    winBreakPtsChances: value.winBreakPtsChances,
                    breakPtsWinned: value.breakPtsWinned,
                })
            }

            return right(Result.ok(featureCouples));

        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }
    }
}


function updateCoupleRecord(records: FeatureCoupleRecords, tracker: MatchTracker) {
    const coupleId = `${tracker.me.playerId.id.toString()} ${tracker.partner.playerId.id.toString()}`;

    const [playerId, partnerId] = coupleId.split(" ");

    // check for same couple with diferent order
    if (!!records[coupleId] == false && !!records[`${partnerId} ${playerId}`] == false) {
        records[coupleId] = {
            meshPointsWon: tracker.meshPointsWon,
            meshPointsLost: tracker.meshPointsLost,
            firstServIn: tracker.firstServIn,
            secondServIn: tracker.secondServIn,
            dobleFaults: tracker.dobleFaults,
            pointsWinnedFirstServ: tracker.pointsWinnedFirstServ,
            pointsWinnedSecondServe: tracker.pointsWinnedSecondServ,
            winBreakPtsChances: tracker.winBreakPtsChances,
            breakPtsWinned: tracker.breakPtsWinned,
        }
        return
    }
    records[coupleId].meshPointsWon += tracker.meshPointsWon;
    records[coupleId].meshPointsLost += tracker.meshPointsLost;
    records[coupleId].firstServIn += tracker.firstServIn;
    records[coupleId].secondServIn += tracker.secondServIn;
    records[coupleId].dobleFaults += tracker.dobleFaults;
    records[coupleId].pointsWinnedFirstServ += tracker.pointsWinnedFirstServ;
    records[coupleId].pointsWinnedSecondServe += tracker.pointsWinnedSecondServ;
    records[coupleId].breakPtsWinned += tracker.breakPtsWinned;
    records[coupleId].winBreakPtsChances += tracker.winBreakPtsChances;
}
