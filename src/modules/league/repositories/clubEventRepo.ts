import { ClubEvent } from "../domain/clubEvent";

export interface ClubEventQuery {
    clubId?: string;
}

export interface ClubEventRepository {
    list(query: ClubEventQuery): Promise<Array<ClubEvent>>
    create(event: ClubEvent): Promise<void>
}
