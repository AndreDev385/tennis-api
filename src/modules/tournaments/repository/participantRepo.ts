import { Participant } from "../domain/participant";

export type ParticipantQuery = {
    userId: string;
}

export type ParticipantRepo = {
    get(q: ParticipantQuery): Promise<Participant>;
    save(p: Participant): Promise<void>;
}
