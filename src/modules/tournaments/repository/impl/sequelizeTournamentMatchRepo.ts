import { TournamentMatch } from "../../domain/tournamentMatch";
import { TournamentMatchQuery, TournamentMatchRepo } from "../tournamentMatchRepo";

export class SequelizeTournamentMatchRepository implements TournamentMatchRepo {

    async get(q: TournamentMatchQuery): Promise<TournamentMatch> {
        throw new Error("Method not implemented.");
    }

    async save(match: TournamentMatch): Promise<void> {
        throw new Error("Method not implemented.");
    }

}
