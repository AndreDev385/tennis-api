import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { CoupleRepository } from "../../repository/coupleRepo";

type Response = Either<AppError.UnexpectedError, Result<any>>;

export class PaginateCouples implements UseCase<any, Response> {
	private readonly couplesRepo: CoupleRepository;

	constructor(repo: CoupleRepository) {
		this.couplesRepo = repo;
	}

	async execute(req: any): Promise<Response> {
		try {
			const result = await this.couplesRepo.paginate(
				{},
				{
					limit: req.limit,
					offset: req.offset,
				},
			);

			return right(Result.ok(result));
		} catch (error) {
			return left(new AppError.UnexpectedError(error));
		}
	}
}
