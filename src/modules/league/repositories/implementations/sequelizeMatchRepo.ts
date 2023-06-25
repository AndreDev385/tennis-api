import { Match } from "../../domain/match";
import { MatchRepository } from "../matchRepo";
import { TrackerRepository } from "../trackerRepo";

export class SequelizeMatchRepository implements MatchRepository {

    models: any;
    trackerRepo: TrackerRepository;

    constructor(models: any, trackerRepo: TrackerRepository) {
        this.models = models;
        this.trackerRepo = trackerRepo;
    }

    save(match: Match): Promise<void> {
        throw new Error("Method not implemented.");
    }


    getMatchById(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

}
