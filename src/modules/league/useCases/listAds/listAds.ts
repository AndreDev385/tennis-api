import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { AdMap } from "../../mappers/adMap";
import { AdRepository } from "../../repositories/adRepo";

type Response = Either<AppError.UnexpectedError, Result<Array<any>>>

export class ListAds implements UseCase<any, Response> {

    private adsRepo: AdRepository;

    constructor(adRepo: AdRepository) {
        this.adsRepo = adRepo;
    }

    async execute(request: any): Promise<Response> {
        try {
            const query: any = {}
            for (const [key, value] of Object.entries(request)) {
                if (key == 'clubId') {
                    query[key] = value;
                }
            }

            const list = await this.adsRepo.list(query);

            return right(Result.ok(list.map((ad) => AdMap.toPersistance(ad))));
        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }
    }

}
