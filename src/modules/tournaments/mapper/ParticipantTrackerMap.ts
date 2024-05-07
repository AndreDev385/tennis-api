import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Mapper } from "../../../shared/infra/Mapper";
import { ParticipantTrackerData } from "../../../shared/infra/database/sequelize/models/ParticipantTracker";
import { MatchId } from "../../league/domain/matchId";
import { ParticipantId } from "../domain/participantId";
import { ParticipantTracker } from "../domain/participantTracker";
import { TournamentId } from "../domain/tournamentId";

export class ParticipantTrackerMap implements Mapper<ParticipantTracker> {
    static toDto(p: ParticipantTracker | null) {
        if (!p) return null;
        console.log(p.participantTrackerId.id.toString(), "ID");
        return {
            participantTrackerId: p.participantTrackerId.id.toString(),
            participantId: p.participantId.id.toString(),
            tournamentId: p.tournamentId.id.toString(),
            matchId: p.matchId.id.toString(),
            isDouble: p.isDouble,
            // serv
            saveBreakPtsChances: p.saveBreakPtsChances,
            breakPtsChances: p.breakPtsChances,
            breakPtsSaved: p.breakPtsSaved,
            breakPts: p.breakPts,
            firstServIn: p.firstServIn,
            secondServIn: p.secondServIn,
            aces: p.aces,
            dobleFaults: p.dobleFaults,
            firstServWon: p.firstServWon,
            secondServWon: p.secondServWon,
            pointsWinnedFirstServ: p.pointsWinnedFirstServ,
            pointsWinnedSecondServ: p.pointsWinnedSecondServ,
            gamesWonServing: p.gamesWonServing,
            gamesLostServing: p.gamesLostServing,
            gamesWonReturning: p.gamesWonReturning,
            gamesLostReturning: p.gamesLostReturning,
            // return
            firstReturnWon: p.firstReturnWon,
            secondReturnWon: p.secondReturnWon,
            firstReturnWinner: p.firstReturnWinner,
            secondReturnWinner: p.secondReturnWinner,
            firstReturnIn: p.firstReturnIn,
            secondReturnIn: p.secondReturnIn,
            firstReturnOut: p.firstReturnOut,
            secondReturnOut: p.secondReturnOut,
            pointsWinnedFirstReturn: p.pointsWinnedFirstReturn,
            pointsWinnedSecondReturn: p.pointsWinnedSecondReturn,
            // places
            meshPointsWon: p.meshPointsWon,
            meshPointsLost: p.meshPointsLost,
            meshWinner: p.meshWinner,
            meshError: p.meshError,
            bckgPointsWon: p.bckgPointsWon,
            bckgPointsLost: p.bckgPointsLost,
            bckgWinner: p.bckgWinner,
            bckgError: p.bckgError,
            // rally
            shortRallyWon: p.shortRallyWon,
            shortRallyLost: p.shortRallyLost,
            mediumRallyWon: p.mediumRallyWon,
            mediumRallyLost: p.mediumRallyLost,
            longRallyWon: p.longRallyWon,
            longRallyLost: p.longRallyLost,
            createdAt: p.createdAt,
            updatedAt: p.updatedAt,
        };
    }

    static toDomain(raw: ParticipantTrackerData | null) {
        if (!raw) return null;
        return ParticipantTracker.create(
            {
                participantId: ParticipantId.create(
                    new UniqueEntityID(raw.participantId)
                ).getValue(),
                tournamentId: TournamentId.create(
                    new UniqueEntityID(raw.tournamentId)
                ).getValue(),
                matchId: MatchId.create(
                    new UniqueEntityID(raw.matchId)
                ).getValue(),
                isDouble: raw.isDouble,
                saveBreakPtsChances: raw.saveBreakPtsChances,
                breakPtsChances: raw.breakPtsChances,
                breakPtsSaved: raw.breakPtsSaved,
                breakPts: raw.breakPts,
                firstServIn: raw.firstServIn,
                secondServIn: raw.secondServIn,
                aces: raw.aces,
                dobleFaults: raw.dobleFaults,
                firstServWon: raw.firstServWon,
                secondServWon: raw.secondServWon,
                pointsWinnedFirstServ: raw.pointsWinnedFirstServ,
                pointsWinnedSecondServ: raw.pointsWinnedSecondServ,
                gamesWonServing: raw.gamesWonServing,
                gamesLostServing: raw.gamesLostServing,
                gamesWonReturning: raw.gamesWonReturning,
                gamesLostReturning: raw.gamesLostReturning,
                // return
                firstReturnWon: raw.firstReturnWon,
                secondReturnWon: raw.secondReturnWon,
                firstReturnWinner: raw.firstReturnWinner,
                secondReturnWinner: raw.secondReturnWinner,
                firstReturnIn: raw.firstReturnIn,
                secondReturnIn: raw.secondReturnIn,
                firstReturnOut: raw.firstReturnOut,
                secondReturnOut: raw.secondReturnOut,
                pointsWinnedFirstReturn: raw.pointsWinnedFirstReturn,
                pointsWinnedSecondReturn: raw.pointsWinnedSecondReturn,
                // places
                meshPointsWon: raw.meshPointsWon,
                meshPointsLost: raw.meshPointsLost,
                meshWinner: raw.meshWinner,
                meshError: raw.meshError,
                bckgPointsWon: raw.bckgPointsWon,
                bckgPointsLost: raw.bckgPointsLost,
                bckgWinner: raw.bckgWinner,
                bckgError: raw.bckgError,
                // rally
                shortRallyWon: raw.shortRallyWon,
                shortRallyLost: raw.shortRallyLost,
                mediumRallyWon: raw.mediumRallyWon,
                mediumRallyLost: raw.mediumRallyLost,
                longRallyWon: raw.longRallyWon,
                longRallyLost: raw.longRallyLost,
                createdAt: raw.createdAt,
                updatedAt: raw.updatedAt,
            },
            new UniqueEntityID(raw.participantTrackerId)
        ).getValue();
    }
}
