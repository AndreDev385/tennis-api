import { ClubEvent } from "../domain/clubEvent";

export interface ClubEventRepository {
    list(): Promise<Array<ClubEvent>>
    create(event: ClubEvent): Promise<void>
}
