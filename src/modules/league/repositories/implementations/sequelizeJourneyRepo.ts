import { JourneyDto } from "../../dtos/journeyDto";
import { JourneyRepository } from "../journeyRepo";

export class SequelizeJourneyRepository implements JourneyRepository {

    models: any;

    constructor(models: any) {
        this.models = models;
    }

    async list(): Promise<JourneyDto[]> {
        const JourneyModel = this.models.JourneyModel;

        return JourneyModel.findAll({ attributes: ["name"] });
    }
}
