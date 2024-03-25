import { Mapper } from "../../../shared/infra/Mapper";
import { TournamentMatch } from "../domain/tournamentMatch";

export class TournamentMatchMap implements Mapper<TournamentMatch> {
    public static forQuery(raw: any) {
        return {

        }
    }

    public static toDomain() {

    }
}
