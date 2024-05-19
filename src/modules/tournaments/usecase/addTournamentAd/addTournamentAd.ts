import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { UniqueEntityID } from "../../../../shared/domain/UniqueEntityID";
import { UploadImageServices } from "../../../league/services/uploadImageService";
import { TournamentAd } from "../../domain/tournamentAd";
import { TournamentId } from "../../domain/tournamentId";

type Response = Either<
    AppError.UnexpectedError | AppError.NotFoundError | Result<string>,
    Result<void>
>;

export class AddTournamentAdd implements UseCase<any, Response> {
    private uploadImgService: UploadImageServices;
    //TODO private adRepo: AdRepository;

    constructor(
        uploadImgService: UploadImageServices
        //adRepo: AdRepository
    ) {
        this.uploadImgService = uploadImgService;
        //this.adRepo = adRepo;
    }

    async execute(request: any): Promise<Response> {
        let imgUrl: string;
        try {
            try {
                imgUrl = await this.uploadImgService.upload(request.file.path);
            } catch (error) {
                console.log(error);
                return left(
                    Result.fail<string>(
                        "Ha ocurrido un error al subir el archivo"
                    )
                );
            }

            const adOrError = TournamentAd.create({
                image: imgUrl,
                link: request.link,
                tournamentId: TournamentId.create(
                    new UniqueEntityID(request.tournamentId)
                ).getValue(),
            });

            if (adOrError.isFailure) {
                return left(
                    Result.fail<string>(`${adOrError.getErrorValue()}`)
                );
            }

            const tournamentAd = adOrError.getValue();

            //await this.adRepo.save(ad);

            return right(Result.ok<void>());
        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }
    }
}
