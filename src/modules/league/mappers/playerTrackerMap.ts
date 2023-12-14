import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Mapper } from "../../../shared/infra/Mapper";
import { PlayerId } from "../domain/playerId";
import { PlayerTracker } from "../domain/playerTracker";
import { SeasonId } from "../domain/seasonId";
import { PlayerTrackerDto } from "../dtos/playerTrackerDto";

export class PlayerTrackerMapper implements Mapper<PlayerTracker> {
    public static toDto(playerTracker: PlayerTracker): PlayerTrackerDto {
        return {
            playerTrackerId: playerTracker.playerTrackerId.id.toString(),
            playerId: playerTracker.playerId.id.toString(),
            seasonId: playerTracker.seasonId.id.toString(),
            isDouble: playerTracker.isDouble,
            pointsWon: playerTracker.pointsWon,
            pointsWonServing: playerTracker.pointsWonServing,
            pointsWonReturning: playerTracker.pointsWonReturning,
            pointsLost: playerTracker.pointsLost,
            pointsLostReturning: playerTracker.pointsLostReturning,
            pointsLostServing: playerTracker.pointsLostServing,
            saveBreakPtsChances: playerTracker.saveBreakPtsChances,
            breakPtsSaved: playerTracker.breakPtsSaved,
            gamesWonServing: playerTracker.gamesWonServing,
            gamesLostServing: playerTracker.gamesLostServing,
            pointsWinnedFirstServ: playerTracker.pointsWinnedFirstServ,
            pointsWinnedSecondServ: playerTracker.pointsWinnedSecondServ,
            firstServIn: playerTracker.firstServIn,
            secondServIn: playerTracker.secondServIn,
            firstServWon: playerTracker.firstServWon,
            secondServWon: playerTracker.secondServWon,
            aces: playerTracker.aces,
            dobleFaults: playerTracker.dobleFaults,
            pointsWinnedFirstReturn: playerTracker.pointsWinnedFirstReturn,
            pointsWinnedSecondReturn: playerTracker.pointsWinnedSecondReturn,
            firstReturnIn: playerTracker.firstReturnIn,
            secondReturnIn: playerTracker.secondReturnIn,
            firstReturnOut: playerTracker.firstReturnOut,
            secondReturnOut: playerTracker.secondReturnOut,
            firstReturnWon: playerTracker.firstReturnWon,
            secondReturnWon: playerTracker.secondReturnWon,
            firstReturnWinner: playerTracker.firstReturnWinner,
            secondReturnWinner: playerTracker.secondReturnWinner,
            meshPointsWon: playerTracker.meshPointsWon,
            meshPointsLost: playerTracker.meshPointsLost,
            meshError: playerTracker.meshError,
            meshWinner: playerTracker.meshWinner,
            bckgPointsWon: playerTracker.bckgPointsWon,
            bckgPointsLost: playerTracker.bckgPointsLost,
            bckgError: playerTracker.bckgError,
            bckgWinner: playerTracker.bckgWinner,
        };
    }

    public static toPersistance(playerTracker: PlayerTracker) {
        return {
            playerId: playerTracker.playerId.id.toString(),
            seasonId: playerTracker.seasonId.id.toString(),
            playerTrackerId: playerTracker.playerTrackerId.id.toString(),
            isDouble: playerTracker.isDouble,
            pointsWon: playerTracker.pointsWon,
            pointsWonServing: playerTracker.pointsWonServing,
            pointsWonReturning: playerTracker.pointsWonReturning,
            pointsLost: playerTracker.pointsLost,
            pointsLostReturning: playerTracker.pointsLostReturning,
            pointsLostServing: playerTracker.pointsLostServing,
            saveBreakPtsChances: playerTracker.saveBreakPtsChances,
            breakPtsSaved: playerTracker.breakPtsSaved,
            gamesWonServing: playerTracker.gamesWonServing,
            gamesLostServing: playerTracker.gamesLostServing,
            pointsWinnedFirstServ: playerTracker.pointsWinnedFirstServ,
            pointsWinnedSecondServ: playerTracker.pointsWinnedSecondServ,
            firstServIn: playerTracker.firstServIn,
            secondServIn: playerTracker.secondServIn,
            firstServWon: playerTracker.firstServWon,
            secondServWon: playerTracker.secondServWon,
            aces: playerTracker.aces,
            dobleFaults: playerTracker.dobleFaults,
            pointsWinnedFirstReturn: playerTracker.pointsWinnedFirstReturn,
            pointsWinnedSecondReturn: playerTracker.pointsWinnedSecondReturn,
            firstReturnIn: playerTracker.firstReturnIn,
            secondReturnIn: playerTracker.secondReturnIn,
            firstReturnOut: playerTracker.firstReturnOut,
            secondReturnOut: playerTracker.secondReturnOut,
            firstReturnWon: playerTracker.firstReturnWon,
            secondReturnWon: playerTracker.secondReturnWon,
            firstReturnWinner: playerTracker.firstReturnWinner,
            secondReturnWinner: playerTracker.secondReturnWinner,
            meshPointsWon: playerTracker.meshPointsWon,
            meshPointsLost: playerTracker.meshPointsLost,
            meshError: playerTracker.meshError,
            meshWinner: playerTracker.meshWinner,
            bckgPointsWon: playerTracker.bckgPointsWon,
            bckgPointsLost: playerTracker.bckgPointsLost,
            bckgError: playerTracker.bckgError,
            bckgWinner: playerTracker.bckgWinner,
        };
    }

    public static toDomain(raw: any): PlayerTracker | null {
        const playerId = PlayerId.create(new UniqueEntityID(raw.playerId));
        const seasonId = SeasonId.create(new UniqueEntityID(raw.seasonId));

        const playerTrackerOrError = PlayerTracker.create(
            {
                seasonId: seasonId.getValue(),
                playerId: playerId.getValue(),
                isDouble: raw.isDouble,
                pointsWon: raw.pointsWon,
                pointsWonServing: raw.pointsWonServing,
                pointsWonReturning: raw.pointsWonReturning,
                pointsLost: raw.pointsLost,
                pointsLostReturning: raw.pointsLostReturning,
                pointsLostServing: raw.pointsLostServing,
                saveBreakPtsChances: raw.saveBreakPtsChances,
                breakPtsSaved: raw.breakPtsSaved,
                gamesWonServing: raw.gamesWonServing,
                gamesLostServing: raw.gamesLostServing,
                pointsWinnedFirstServ: raw.pointsWinnedFirstServ,
                pointsWinnedSecondServ: raw.pointsWinnedSecondServ,
                firstServIn: raw.firstServIn,
                secondServIn: raw.secondServIn,
                firstServWon: raw.firstServWon,
                secondServWon: raw.secondServWon,
                aces: raw.aces,
                dobleFaults: raw.dobleFaults,
                pointsWinnedFirstReturn: raw.pointsWinnedFirstReturn,
                pointsWinnedSecondReturn: raw.pointsWinnedSecondReturn,
                firstReturnIn: raw.firstReturnIn,
                secondReturnIn: raw.secondReturnIn,
                firstReturnOut: raw.firstReturnOut,
                secondReturnOut: raw.secondReturnOut,
                firstReturnWon: raw.firstReturnWon,
                secondReturnWon: raw.secondReturnWon,
                firstReturnWinner: raw.firstReturnWinner,
                secondReturnWinner: raw.secondReturnWinner,
                meshPointsWon: raw.meshPointsWon,
                meshPointsLost: raw.meshPointsLost,
                meshError: raw.meshError,
                meshWinner: raw.meshWinner,
                bckgPointsWon: raw.bckgPointsWon,
                bckgPointsLost: raw.bckgPointsLost,
                bckgError: raw.bckgError,
                bckgWinner: raw.bckgWinner,
            },
            new UniqueEntityID(raw.playerTrackerId)
        );

        playerTrackerOrError.isFailure
            ? console.log(playerTrackerOrError.getErrorValue())
            : "";

        return playerTrackerOrError.isSuccess
            ? playerTrackerOrError.getValue()
            : null;
    }
}
