import { TournamentModel } from "../../../../shared/infra/database/sequelize/models/Tournament";
import { Tournament } from "../../domain/tournament";
import { TournamentMap } from "../../mapper/TournamentMap";
import { TournamentQuery, TournamentRepository } from "../tournamentRepo";

export class SequelizeTournamentRepository implements TournamentRepository {
    private async exists(tournamentId: string) {
        const exist = await TournamentModel.findOne({
            where: { tournamentId },
        });

        return !!exist;
    }

    async save(tournament: Tournament): Promise<void> {
        const raw = TournamentMap.toPersistance(tournament);

        const exist = await this.exists(tournament.tournamentId.id.toString());

        if (exist) {
            await TournamentModel.update(raw, {
                where: { tournamentId: raw.tournamentId },
            });
            return;
        } else {
            const instance = await TournamentModel.create(raw);
            await instance.save();
        }
    }

    async get(q: TournamentQuery): Promise<Tournament> {
        const data = await TournamentModel.findOne({ where: q });

        if (!data) {
            throw new Error("Torneo no encontrado");
        }

        return TournamentMap.toDomain(data);
    }
}
