import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Mapper } from "../../../shared/infra/Mapper";
import { PlayerId } from "../domain/playerId";
import { PlayerTracker } from "../domain/playerTracker";

export class PlayerTrackerMapper implements Mapper<PlayerTracker> {
    public static toDto(playerTracker: PlayerTracker) {
        return {
            playerTrackerId: playerTracker.playerTrackerId.id.toString(),
            pointsWon: playerTracker.pointsWon,
            pointsWonServing: playerTracker.pointsWonServing,
            pointsWonReturning: playerTracker.pointsWonReturning,
            pointsLost: playerTracker.pointsLost,
            pointsLostReturning: playerTracker.pointsLostReturning,
            pointsLostServing: playerTracker.pointsLostServing,
            saveBreakPtsChances: playerTracker.saveBreakPtsChances,
            breakPtsSaved: playerTracker.breakPtsSaved,
            pointsWinnedFirstServ: playerTracker.pointsWinnedFirstServ,
            pointsWinnedSecondServ: playerTracker.pointsWinnedSecondServ,
            firstServIn: playerTracker.firstServIn,
            secondServIn: playerTracker.secondServIn,
            aces: playerTracker.aces,
            dobleFaults: playerTracker.dobleFaults,
            pointsWinnedFirstReturn: playerTracker.pointsWinnedFirstReturn,
            pointsWinnedSecondReturn: playerTracker.pointsWinnedSecondReturn,
            firstReturnIn: playerTracker.firstReturnIn,
            secondReturnIn: playerTracker.secondReturnIn,
            meshPointsWon: playerTracker.meshPointsWon,
            meshPointsLost: playerTracker.meshPointsLost,
            bckgPointsWon: playerTracker.bckgPointsWon,
            bckgPointsLost: playerTracker.bckgPointsLost,
            winners: playerTracker.winners,
            noForcedErrors: playerTracker.noForcedErrors,
        };
    }

    public static toPersistance(playerTracker: PlayerTracker) {
        return {
            playerId: playerTracker.playerId.id.toString(),
            playerTrackerId: playerTracker.playerTrackerId.id.toString(),
            pointsWon: playerTracker.pointsWon,
            pointsWonServing: playerTracker.pointsWonServing,
            pointsWonReturning: playerTracker.pointsWonReturning,
            pointsLost: playerTracker.pointsLost,
            pointsLostReturning: playerTracker.pointsLostReturning,
            pointsLostServing: playerTracker.pointsLostServing,
            saveBreakPtsChances: playerTracker.saveBreakPtsChances,
            breakPtsSaved: playerTracker.breakPtsSaved,
            pointsWinnedFirstServ: playerTracker.pointsWinnedFirstServ,
            pointsWinnedSecondServ: playerTracker.pointsWinnedSecondServ,
            firstServIn: playerTracker.firstServIn,
            secondServIn: playerTracker.secondServIn,
            aces: playerTracker.aces,
            dobleFaults: playerTracker.dobleFaults,
            pointsWinnedFirstReturn: playerTracker.pointsWinnedFirstReturn,
            pointsWinnedSecondReturn: playerTracker.pointsWinnedSecondReturn,
            firstReturnIn: playerTracker.firstReturnIn,
            secondReturnIn: playerTracker.secondReturnIn,
            meshPointsWon: playerTracker.meshPointsWon,
            meshPointsLost: playerTracker.meshPointsLost,
            bckgPointsWon: playerTracker.bckgPointsWon,
            bckgPointsLost: playerTracker.bckgPointsLost,
            winners: playerTracker.winners,
            noForcedErrors: playerTracker.noForcedErrors,
        };
    }

    public static toDomain(raw: any): PlayerTracker {
        const playerId = PlayerId.create(new UniqueEntityID(raw.playerId));

        const playerTrackerOrError = PlayerTracker.create(
            {
                playerId: playerId.getValue(),
                pointsWon: raw.pointsWon,
                pointsWonServing: raw.pointsWonServing,
                pointsWonReturning: raw.pointsWonReturning,
                pointsLost: raw.pointsLost,
                pointsLostReturning: raw.pointsLostReturning,
                pointsLostServing: raw.pointsLostServing,
                saveBreakPtsChances: raw.saveBreakPtsChances,
                breakPtsSaved: raw.breakPtsSaved,
                pointsWinnedFirstServ: raw.pointsWinnedFirstServ,
                pointsWinnedSecondServ: raw.pointsWinnedSecondServ,
                firstServIn: raw.firstServIn,
                secondServIn: raw.secondServIn,
                aces: raw.aces,
                dobleFaults: raw.dobleFaults,
                pointsWinnedFirstReturn: raw.pointsWinnedFirstReturn,
                pointsWinnedSecondReturn: raw.pointsWinnedSecondReturn,
                firstReturnIn: raw.firstReturnIn,
                secondReturnIn: raw.secondReturnIn,
                meshPointsWon: raw.meshPointsWon,
                meshPointsLost: raw.meshPointsLost,
                bckgPointsWon: raw.bckgPointsWon,
                bckgPointsLost: raw.bckgPointsLost,
                winners: raw.winners,
                noForcedErrors: raw.noForcedErrors,
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
