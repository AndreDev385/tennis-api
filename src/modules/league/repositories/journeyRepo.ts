import { JourneyDto } from "../dtos/journeyDto";

export interface JourneyRepository {
    list(): Promise<Array<JourneyDto>>;
}
