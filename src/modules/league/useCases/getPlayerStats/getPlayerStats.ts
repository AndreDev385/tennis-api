import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { Player } from "../../domain/player";
import { PlayerTracker } from "../../domain/playerTracker";
import { PlayerTrackerDto } from "../../dtos/playerTrackerDto";
import { PlayerRepository } from "../../repositories/playerRepo";
import {
    PlayerTrackerQuery,
    PlayerTrackerRepository,
} from "../../repositories/playerTrackerRepo";

export interface GetPlayerStatsRequest {
    userId: string;
    isDouble: boolean;
    season?: string;
    limit?: number;
}

type Response = Either<
    AppError.UnexpectedError | AppError.NotFoundError | Result<string>,
    Result<PlayerTrackerDto>
>;

export class GetPlayerStats
    implements UseCase<GetPlayerStatsRequest, Response>
{
    private playerTrackerRepo: PlayerTrackerRepository;
    private playerRepo: PlayerRepository;

    constructor(repo: PlayerTrackerRepository, playerRepo: PlayerRepository) {
        this.playerTrackerRepo = repo;
        this.playerRepo = playerRepo;
    }

    async execute(request: GetPlayerStatsRequest): Promise<Response> {
        let player: Player;
        try {
            try {
                player = await this.playerRepo.getPlayerByUserId(
                    request.userId
                );
            } catch (error) {
                return left(new AppError.NotFoundError(error));
            }

            const query: PlayerTrackerQuery = {
                playerId: player.playerId.id.toString(),
                isDouble: request.isDouble ?? true
            };

            for (const [key, value] of Object.entries(request)) {
                if (key == "season") {
                    query.seasonId = value as string;
                }
                if (key == "limit") {
                    query.limit = value as number;
                }
            }

            if (query.seasonId && !checkIfValidUUID(query.seasonId)) {
                return left(Result.fail<string>("Temporada invalida"));
            }

            const list = await this.playerTrackerRepo.getByPlayerId(query);

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
        isDouble: stats[0].isDouble,
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
        firstServWon: 0,
        secondServWon: 0,
        aces: 0,
        dobleFaults: 0,
        pointsWinnedFirstReturn: 0,
        pointsWinnedSecondReturn: 0,
        firstReturnIn: 0,
        secondReturnIn: 0,
        firstReturnOut: 0,
        secondReturnOut: 0,
        firstReturnWon: 0,
        secondReturnWon: 0,
        firstReturnWinner: 0,
        secondReturnWinner: 0,
        meshPointsWon: 0,
        meshPointsLost: 0,
        meshError: 0,
        meshWinner: 0,
        bckgPointsWon: 0,
        bckgPointsLost: 0,
        bckgError: 0,
        bckgWinner: 0,
    };

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
        totalStats.firstServWon += matchStats.firstServWon;
        totalStats.secondServWon += matchStats.secondServWon;
        totalStats.aces += matchStats.aces;
        totalStats.dobleFaults += matchStats.dobleFaults;
        totalStats.pointsWinnedFirstReturn +=
            matchStats.pointsWinnedFirstReturn;
        totalStats.pointsWinnedSecondReturn +=
            matchStats.pointsWinnedSecondReturn;
        totalStats.firstReturnIn += matchStats.firstReturnIn;
        totalStats.secondReturnIn += matchStats.secondReturnIn;
        totalStats.firstReturnOut += matchStats.firstReturnOut;
        totalStats.secondReturnOut += matchStats.secondReturnOut;
        totalStats.firstReturnWon += matchStats.firstReturnWon;
        totalStats.secondReturnWon += matchStats.secondReturnWon;
        totalStats.firstReturnWinner += matchStats.firstReturnWinner;
        totalStats.secondReturnWinner += matchStats.secondReturnWinner;
        totalStats.meshPointsWon += matchStats.meshPointsWon;
        totalStats.meshPointsLost += matchStats.meshPointsLost;
        totalStats.meshError += matchStats.meshError;
        totalStats.meshWinner += matchStats.meshWinner;
        totalStats.bckgPointsWon += matchStats.bckgPointsWon;
        totalStats.bckgPointsLost += matchStats.bckgPointsLost;
        totalStats.bckgWinner += matchStats.bckgWinner;
        totalStats.bckgError += matchStats.bckgError;
        totalStats.gamesWonServing += matchStats.gamesWonServing;
        totalStats.gamesLostServing += matchStats.gamesLostServing;
    }

    return totalStats;
}

function checkIfValidUUID(str: string) {
    const regexExp =
        /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

    return regexExp.test(str);
}
