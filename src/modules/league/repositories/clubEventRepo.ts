import { ClubEvent } from "../domain/clubEvent";

export interface ClubEventQuery {
    clubId?: string;
}

export interface ClubEventRepository {
    list(query: ClubEventQuery): Promise<Array<ClubEvent>>
    save(event: ClubEvent): Promise<void>
    delete(eventId: string): Promise<void>
}
