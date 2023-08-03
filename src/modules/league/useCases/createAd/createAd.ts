import { AppError } from "../../../../shared/core/AppError";
import { Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { UniqueEntityID } from "../../../../shared/domain/UniqueEntityID";
import { Ad } from "../../domain/ad";
import { ClubId } from "../../domain/clubId";
import { AdRepository } from "../../repositories/adRepo";
import { UploadImageServices } from "../../services/uploadImageService";

export class CreateAd implements UseCase<any, any> {
    private uploadImgService: UploadImageServices;
    private adRepo: AdRepository;

    constructor(
        uploadImgService: UploadImageServices,
        adRepo: AdRepository
    ) {
        this.uploadImgService = uploadImgService;
        this.adRepo = adRepo;
    }

    async execute(request: any) {
        let imgUrl: string;
        try {
            try {
                imgUrl = await this.uploadImgService.upload(request.file.path);
                console.log(imgUrl);
            } catch (error) {
                console.log(error)
                return left(
                    Result.fail<string>(
                        "Ha ocurrido un error al subir el archivo"
                    )
                );
            }

            const adOrError = Ad.create({
                clubId: ClubId.create(
                    new UniqueEntityID(request.clubId)
                ).getValue(),
                image: imgUrl,
                link: request.link,
            });

            if (adOrError.isFailure) {
                return left(
                    Result.fail<string>(`${adOrError.getErrorValue()}`)
                );
            }

            const ad = adOrError.getValue();

            await this.adRepo.save(ad);

            return right(Result.ok<void>());
        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }
    }
}
