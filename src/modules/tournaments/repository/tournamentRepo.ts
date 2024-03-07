import { Tournament } from "../domain/tournament";

type TournamentQuery = {
    tournamentId: string;
    name?: string
}

export type TournamentRepository = {
    save(tournament: Tournament): Promise<void>;
    get(q: TournamentQuery): Promise<Tournament>
}
