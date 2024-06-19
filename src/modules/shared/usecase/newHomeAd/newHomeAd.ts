import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { UploadImageServices } from "../../../league/services/uploadImageService";
import { HomeAdDto } from "../../dtos/homeAdDto";
import { HomeAdRepository } from "../../repository/homeAdRepo";

type Req = any;

type Res = Either<AppError.UnexpectedError | Result<string>, Result<void>>;

export class NewHomeAd implements UseCase<Req, Res> {
    private uploadImgService: UploadImageServices;
    private adRepo: HomeAdRepository;

    constructor(
        uploadImgService: UploadImageServices,
        adRepo: HomeAdRepository
    ) {
        this.uploadImgService = uploadImgService;
        this.adRepo = adRepo;
    }

    async execute(request: any): Promise<Res> {
        let imgUrl: string;
        try {
            try {
                imgUrl = await this.uploadImgService.upload(request.file.path);
            } catch (error) {
                return left(
                    Result.fail<string>(
                        "Ha ocurrido un error al subir el archivo"
                    )
                );
            }

            const ad: HomeAdDto = {
                image: imgUrl,
                link: request.link,
            };

            await this.adRepo.save(ad);

            return right(Result.ok<void>());
        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }
    }
}
