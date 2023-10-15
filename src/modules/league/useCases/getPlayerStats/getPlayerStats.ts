import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { Player } from "../../domain/player";
import { PlayerTracker } from "../../domain/playerTracker";
import { PlayerTrackerDto } from "../../dtos/playerTrackerDto";
import { PlayerRepository } from "../../repositories/playerRepo";
import { PlayerTrackerQuery, PlayerTrackerRepository } from "../../repositories/playerTrackerRepo";


export interface GetPlayerStatsRequest {
    userId: string;
    season?: string;
    last3?: string;
}

type Response = Either<AppError.UnexpectedError | AppError.NotFoundError | Result<string>, Result<PlayerTrackerDto>>;

export class GetPlayerStats
    implements UseCase<GetPlayerStatsRequest, Response>
{
    private playerTrackerRepo: PlayerTrackerRepository;
    private playerRepo: PlayerRepository

    constructor(repo: PlayerTrackerRepository, playerRepo: PlayerRepository) {
        this.playerTrackerRepo = repo;
        this.playerRepo = playerRepo;
    }

    async execute(request: GetPlayerStatsRequest): Promise<Response> {
        let player: Player;
        try {
            const query: any = {};

            for (const [key, value] of Object.entries(request)) {
                if (key == "season") {
                    query.season = value as string;
                }
                if (key == "last") {
                    query.last = true;
                }
                if (key == "last3" && !!value == true) {
                    query.last3 = true;
                }
            }

            try {
                player = await this.playerRepo.getPlayerByUserId(request.userId);
            } catch (error) {
                return left(new AppError.NotFoundError(error))
            }

            if (query.season && !checkIfValidUUID(query.season)) {
                return left(Result.fail<string>("Temporada invalida"));
            }

            const statsQuery: PlayerTrackerQuery = {
                playerId: player.playerId.id.toString(),
            }

            if (query.last) {
                statsQuery.limit = 1;
            }

            if (query.last3) {
                statsQuery.limit = 3;
            }

            if (query.season != null && query.season != "") {
                statsQuery.seasonId = query.season;
            }

            const list = await this.playerTrackerRepo.getByPlayerId(statsQuery);

            return right(Result.ok(calculatePlayerStats(list)));
        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }
    }
}

function calculatePlayerStats(stats: Array<PlayerTracker>) {
    const totalStats: PlayerTrackerDto = {
        playerId: stats[0].playerId.id.toString(),
        playerTrackerId: stats[0].playerTrackerId.id.toString(),
        seasonId: stats[0].seasonId.id.toString(),
        pointsWon: 0,
        pointsWonServing: 0,
        pointsWonReturning: 0,
        pointsLost: 0,
        pointsLostReturning: 0,
        pointsLostServing: 0,
        saveBreakPtsChances: 0,
        breakPtsSaved: 0,
        gamesWonServing: 0,
        gamesLostServing: 0,
        pointsWinnedFirstServ: 0,
        pointsWinnedSecondServ: 0,
        firstServIn: 0,
        secondServIn: 0,
        aces: 0,
        dobleFaults: 0,
        pointsWinnedFirstReturn: 0,
        pointsWinnedSecondReturn: 0,
        firstReturnIn: 0,
        secondReturnIn: 0,
        firstReturnOut: 0,
        secondReturnOut: 0,
        meshPointsWon: 0,
        meshPointsLost: 0,
        bckgPointsWon: 0,
        bckgPointsLost: 0,
        winners: 0,
        noForcedErrors: 0,
    }

    for (const matchStats of stats) {
        totalStats.pointsWon += matchStats.pointsWon;
        totalStats.pointsWonServing += matchStats.pointsWonServing;
        totalStats.pointsWonReturning += matchStats.pointsWonReturning;
        totalStats.pointsLost += matchStats.pointsLost;
        totalStats.pointsLostReturning += matchStats.pointsLostReturning;
        totalStats.pointsLostServing += matchStats.pointsLostServing;
        totalStats.saveBreakPtsChances += matchStats.saveBreakPtsChances;
        totalStats.breakPtsSaved += matchStats.breakPtsSaved;
        totalStats.pointsWinnedFirstServ += matchStats.pointsWinnedFirstServ;
        totalStats.pointsWinnedSecondServ += matchStats.pointsWinnedSecondServ;
        totalStats.firstServIn += matchStats.firstServIn;
        totalStats.secondServIn += matchStats.secondServIn;
        totalStats.aces += matchStats.aces;
        totalStats.dobleFaults += matchStats.dobleFaults;
        totalStats.pointsWinnedFirstReturn += matchStats.pointsWinnedFirstReturn;
        totalStats.pointsWinnedSecondReturn += matchStats.pointsWinnedSecondReturn;
        totalStats.firstReturnIn += matchStats.firstReturnIn;
        totalStats.secondReturnIn += matchStats.secondReturnIn;
        totalStats.firstReturnOut += matchStats.firstReturnOut;
        totalStats.secondReturnOut += matchStats.secondReturnOut;
        totalStats.meshPointsWon += matchStats.meshPointsWon;
        totalStats.meshPointsLost += matchStats.meshPointsLost;
        totalStats.bckgPointsWon += matchStats.bckgPointsWon;
        totalStats.bckgPointsLost += matchStats.bckgPointsLost;
        totalStats.winners += matchStats.winners;
        totalStats.noForcedErrors += matchStats.noForcedErrors;
        totalStats.gamesWonServing += matchStats.gamesWonServing
        totalStats.gamesLostServing += matchStats.gamesLostServing
    }

    return totalStats;
}

function checkIfValidUUID(str: string) {
    const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

    return regexExp.test(str);
}
