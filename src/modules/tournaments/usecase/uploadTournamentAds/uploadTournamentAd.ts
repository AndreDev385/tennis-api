import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { UniqueEntityID } from "../../../../shared/domain/UniqueEntityID";
import { UploadImageServices } from "../../../league/services/uploadImageService";
import { TournamentAd } from "../../domain/tournamentAd";
import { TournamentId } from "../../domain/tournamentId";
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
                tournamentId: TournamentId.create(new UniqueEntityID(request.tournamentId)).getValue(),
            });

            if (adOrError.isFailure) {
                return left(
                    Result.fail<string>(`${adOrError.getErrorValue()}`)
                );
            }

            const ad = adOrError.getValue();

            const result = await this.adRepo.save(ad);

            if (result.isFailure) {
                return left(
                    Result.fail<string>(
                        "Ha ocurrido un error al guardar el archivo"
                    )
                );
            }

            return right(Result.ok<void>());
        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }
    }
}
