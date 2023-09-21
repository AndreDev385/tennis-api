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
            aces: playerTracker.aces,
            dobleFaults: playerTracker.dobleFaults,
            pointsWinnedFirstReturn: playerTracker.pointsWinnedFirstReturn,
            pointsWinnedSecondReturn: playerTracker.pointsWinnedSecondReturn,
            firstReturnIn: playerTracker.firstReturnIn,
            secondReturnIn: playerTracker.secondReturnIn,
            firstReturnOut: playerTracker.firstReturnOut,
            secondReturnOut: playerTracker.secondReturnOut,
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
            seasonId: playerTracker.seasonId.id.toString(),
            playerTrackerId: playerTracker.playerTrackerId.id.toString(),
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
            aces: playerTracker.aces,
            dobleFaults: playerTracker.dobleFaults,
            pointsWinnedFirstReturn: playerTracker.pointsWinnedFirstReturn,
            pointsWinnedSecondReturn: playerTracker.pointsWinnedSecondReturn,
            firstReturnIn: playerTracker.firstReturnIn,
            secondReturnIn: playerTracker.secondReturnIn,
            firstReturnOut: playerTracker.firstReturnOut,
            secondReturnOut: playerTracker.secondReturnOut,
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
        const seasonId = SeasonId.create(new UniqueEntityID(raw.seasonId));

        const playerTrackerOrError = PlayerTracker.create(
            {
                seasonId: seasonId.getValue(),
                playerId: playerId.getValue(),
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
                aces: raw.aces,
                dobleFaults: raw.dobleFaults,
                pointsWinnedFirstReturn: raw.pointsWinnedFirstReturn,
                pointsWinnedSecondReturn: raw.pointsWinnedSecondReturn,
                firstReturnIn: raw.firstReturnIn,
                secondReturnIn: raw.secondReturnIn,
                firstReturnOut: raw.firstReturnOut,
                secondReturnOut: raw.secondReturnOut,
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
