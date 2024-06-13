import { AppError } from "../../../../shared/core/AppError";
import { Either, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { ParticipantTrackerDto } from "../../dtos/participantTrackerDto";
import { ParticipantTrackerQuery, ParticipantTrackerRepository } from "../../repository/participantTrackerRepo";

type Res = Either<AppError.UnexpectedError | AppError.NotFoundError, ParticipantTrackerDto>;

type Req = any;

export class GetParticipantStats implements UseCase<Req, Res> {

  private readonly repo: ParticipantTrackerRepository;

  constructor(repo: ParticipantTrackerRepository) {
    this.repo = repo;
  }

  async execute(request: any): Promise<Res> {

    const query: ParticipantTrackerQuery = {}

    const validQueries: Array<keyof ParticipantTrackerQuery> = ["participantId", "participantTrackerId", "tournamentId"];
    for (const [k, v] of Object.entries(request)) {
      if (validQueries.includes(k as any)) {
        query[k as keyof ParticipantTrackerQuery] = v as any;
      }
    }

    try {
      try {
        const result = await this.repo.all(query, { limit: request.query, offset: request.offset });

        return right(result);
      } catch (e) {
        return left(new AppError.NotFoundError(e));
      }

    } catch (e) {
      return left(new AppError.UnexpectedError(e));
    }
  }

}
