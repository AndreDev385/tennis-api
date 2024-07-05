import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { TournamentMatchMap } from "../../mapper/TournamentMatchMap";
import {
	TournamentMatchQuery,
	TournamentMatchRepo,
} from "../../repository/tournamentMatchRepo";

type Response = Either<AppError.UnexpectedError, Result<any>>;

export class PaginateMatches implements UseCase<any, Response> {
	private readonly matchRepo: TournamentMatchRepo;

	constructor(matchRepo: TournamentMatchRepo) {
		this.matchRepo = matchRepo;
	}

	async execute(req: any): Promise<Response> {
		const validQueries: Array<keyof TournamentMatchQuery> = [
			"matchId",
			"tournamentId",
			"contestId",
			"status",
		];

		const query: TournamentMatchQuery = {};

		try {
			for (const [k, v] of Object.entries(req)) {
				if (validQueries.includes(k as keyof TournamentMatchQuery)) {
					if (k === "status") {
						query.status = Number(v);
						continue;
					}
					query[k as keyof TournamentMatchQuery] = v as any;
				}
			}

			const result = await this.matchRepo.paginate(query, {
				limit: req.limit,
				offset: req.offset,
			});

			const json = {
				count: result.count,
				rows: result.rows.map((m) => TournamentMatchMap.toDto(m)),
			};

			return right(Result.ok(json));
		} catch (error) {
			return left(new AppError.UnexpectedError(error));
		}
	}
}
