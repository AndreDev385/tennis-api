import { AppError } from "../../../../shared/core/AppError";
import { Either, Result } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { MatchRepository } from "../../repositories/matchRepo";
import { PlayerRepository } from "../../repositories/playerRepo";
import { TrackerRepository } from "../../repositories/trackerRepo";
import { CreateMatchDto } from "./createMatchDto";

type Response = Either<AppError.UnexpectedError, Result<any>>

export class CreateMatch implements UseCase<CreateMatchDto, Promise<Response>> {

    matchRepo: MatchRepository;
    playerRepo: PlayerRepository;
    trackerRepo: TrackerRepository;

    constructor(matchRepo: MatchRepository, playerRepo: PlayerRepository, trackerRepo: TrackerRepository) {
        this.matchRepo = matchRepo;
        this.playerRepo = playerRepo;
        this.trackerRepo = trackerRepo;
    }

    execute(request: CreateMatchDto): Promise<Response> {

    }

}
