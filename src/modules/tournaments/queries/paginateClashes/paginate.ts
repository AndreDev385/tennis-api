import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { PaginateResponse } from "../../../../shared/infra/database/sequelize/queries/sequelizeQueries";
import {
	ContestClashQuery,
	ContestClashRepository,
} from "../../repository/contestClashRepo";

type Req = {
	limit?: number;
	offset?: number;
	contestId: string;
};

type Res = Either<
	AppError.UnexpectedError | AppError.NotFoundError,
	Result<PaginateResponse<any>>
>;

export class PaginateClashes implements UseCase<Req, Res> {
	private readonly clashRepo: ContestClashRepository;

	constructor(clashRepo: ContestClashRepository) {
		this.clashRepo = clashRepo;
	}

	async execute(request: Req): Promise<Res> {
		try {
			const query: ContestClashQuery = {};

			const validFilters: Array<keyof ContestClashQuery> = [
				"deep",
				"team1Id",
				"team2Id",
				"contestId",
			];

			for (const [k, v] of Object.entries(request)) {
				if (validFilters.includes(k as keyof ContestClashQuery)) {
					query[k as keyof ContestClashQuery] = v as any;
				}
			}

			const result = await this.clashRepo.paginate(query, {
				offset: request.offset,
				limit: 99,
			});

			return right(Result.ok(result));
		} catch (error) {
			return left(new AppError.UnexpectedError(error));
		}
	}
}
