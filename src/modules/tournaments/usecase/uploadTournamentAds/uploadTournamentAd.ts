import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { UploadImageServices } from "../../../league/services/uploadImageService";
import { TournamentAd } from "../../domain/tournamentAd";
import { TournamentAdRepository } from "../../repository/tournamentAdRepo";

type Res = Either<AppError.UnexpectedError | Result<string>, Result<void>>;

export class UploadTournamentAd implements UseCase<any, Res> {
    private uploadImgService: UploadImageServices;
    private adRepo: TournamentAdRepository;

    constructor(
        uploadImgService: UploadImageServices,
        adRepo: TournamentAdRepository
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

            const adOrError = TournamentAd.create({
                image: imgUrl,
                link: request.link,
                tournamentId: request.tournamentId,
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
