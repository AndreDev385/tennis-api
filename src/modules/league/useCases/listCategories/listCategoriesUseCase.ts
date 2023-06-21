import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { CategoryDto } from "../../dtos/categoryDto";
import { CategoryRepository } from "../../repositories/categoryRepo";

type Response = Either<AppError.UnexpectedError, Result<Array<CategoryDto>>>;

export class ListCategoriesUseCase implements UseCase<void, Response> {
    private repo: CategoryRepository;

    constructor(repo: CategoryRepository) {
        this.repo = repo;
    }

    async execute(request?: void): Promise<Response> {
        try {
            const list = await this.repo.list();
            return right(Result.ok(list));
        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }
    }
}
