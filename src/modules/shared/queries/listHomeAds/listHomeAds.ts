import { AppError } from "../../../../shared/core/AppError";
import {
    Either,
    left,
    right,
} from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { HomeAdDto } from "../../dtos/homeAdDto";
import { HomeAdRepository } from "../../repository/homeAdRepo";

type Req = void;

type Res = Either<AppError.UnexpectedError, HomeAdDto[]>;

export class ListHomeAds implements UseCase<Req, Res> {
    private readonly homeAdRepo: HomeAdRepository;

    constructor(homeAdRepo: HomeAdRepository) {
        this.homeAdRepo = homeAdRepo;
    }

    async execute(_: void): Promise<Res> {
        try {
            const list = await this.homeAdRepo.list()
            return right(list);
        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }
    }
}
