import { Result } from "../../../../shared/core/Result";
import models from "../../../../shared/infra/database/sequelize/models";
import { PaginateQuery } from "../../../../shared/infra/database/sequelize/queries/sequelizeQueries";
import { ParticipantTracker } from "../../domain/participantTracker";
import { ParticipantTrackerDto } from "../../dtos/participantTrackerDto";
import { ParticipantTrackerMap } from "../../mapper/ParticipantTrackerMap";
import {
    ParticipantTrackerQuery,
    ParticipantTrackerRepository,
} from "../participantTrackerRepo";

export class SequelizeParticipantTrackerRepository
    implements ParticipantTrackerRepository {

    async all(q: ParticipantTrackerQuery, pagination: PaginateQuery): Promise<ParticipantTrackerDto> {

        const data = await models.ParticipantTrackerModel.findAndCountAll({
            where: q,
            limit: pagination.limit ?? 10,
            offset: pagination.offset ?? 0,
        });


        if (data.count == 0) {
            throw new Error("No se encontraron estadísticas");
        }

        const initial = data.rows[0];

        for (let i = 1; i < data.count; i++) {
            // serv
            initial.saveBreakPtsChances += data.rows[i].saveBreakPtsChances;
            initial.breakPtsChances += data.rows[i].breakPtsChances;
            initial.breakPtsSaved += data.rows[i].breakPtsSaved;
            initial.breakPts += data.rows[i].breakPts;
            initial.firstServIn += data.rows[i].firstServIn;
            initial.secondServIn += data.rows[i].secondServIn;
            initial.aces += data.rows[i].aces;
            initial.dobleFaults += data.rows[i].dobleFaults;
            initial.firstServWon += data.rows[i].firstServWon;
            initial.secondServWon += data.rows[i].secondServWon;
            initial.pointsWinnedFirstServ += data.rows[i].pointsWinnedFirstServ;
            initial.pointsWinnedSecondServ += data.rows[i].pointsWinnedSecondServ;
            initial.gamesWonServing += data.rows[i].gamesWonServing;
            initial.gamesLostServing += data.rows[i].gamesLostServing;
            initial.gamesWonReturning += data.rows[i].gamesWonReturning;
            initial.gamesLostReturning += data.rows[i].gamesLostReturning;
            // return
            initial.firstReturnWon += data.rows[i].firstReturnWon;
            initial.secondReturnWon += data.rows[i].secondReturnWon;
            initial.firstReturnWinner += data.rows[i].firstReturnWinner;
            initial.secondReturnWinner += data.rows[i].secondReturnWinner;
            initial.firstReturnIn += data.rows[i].firstReturnIn;
            initial.secondReturnIn += data.rows[i].secondReturnIn;
            initial.firstReturnOut += data.rows[i].firstReturnOut;
            initial.secondReturnOut += data.rows[i].secondReturnOut;
            initial.pointsWinnedFirstReturn += data.rows[i].pointsWinnedFirstReturn;
            initial.pointsWinnedSecondReturn += data.rows[i].pointsWinnedSecondReturn;
            // places
            initial.meshPointsWon += data.rows[i].meshPointsWon;
            initial.meshPointsLost += data.rows[i].meshPointsLost;
            initial.meshWinner += data.rows[i].meshWinner;
            initial.meshError += data.rows[i].meshError;
            initial.bckgPointsWon += data.rows[i].bckgPointsWon;
            initial.bckgPointsLost += data.rows[i].bckgPointsLost;
            initial.bckgWinner += data.rows[i].bckgWinner;
            initial.bckgError += data.rows[i].bckgError;
            // rally
            initial.shortRallyWon += data.rows[i].shortRallyWon;
            initial.shortRallyLost += data.rows[i].shortRallyLost;
            initial.mediumRallyWon += data.rows[i].mediumRallyWon;
            initial.mediumRallyLost += data.rows[i].mediumRallyLost;
            initial.longRallyWon += data.rows[i].longRallyWon;
            initial.longRallyLost += data.rows[i].longRallyLost;
        }
        return initial;
    }

    async get(q: ParticipantTrackerQuery): Promise<Result<ParticipantTracker>> {
        const data = await models.ParticipantTrackerModel.findOne({
            where: q,
        });

        if (!data) {
            return Result.fail("Estadísticas no encontradas");
        }

        const tracker = ParticipantTrackerMap.toDomain(data);

        return Result.ok(tracker!);
    }

    async save(p: ParticipantTracker): Promise<void> {
        const raw = ParticipantTrackerMap.toDto(p);

        const exist = await models.ParticipantTrackerModel.findOne({
            where: {
                participantTrackerId: p.participantTrackerId.id.toString(),
            },
        });

        if (exist) {
            models.ParticipantTrackerModel.update(raw!, {
                where: {
                    participantTrackerId: p.participantTrackerId.id.toString(),
                },
            });
        } else {
            const instance = await models.ParticipantTrackerModel.create(raw!);
            await instance.save();
        }
    }
}
