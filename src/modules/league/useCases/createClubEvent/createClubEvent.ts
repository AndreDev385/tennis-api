import { AppError } from "../../../../shared/core/AppError";
import { Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { UniqueEntityID } from "../../../../shared/domain/UniqueEntityID";
import { ClubEvent } from "../../domain/clubEvent";
import { ClubId } from "../../domain/clubId";
import { ClubEventRepository } from "../../repositories/clubEventRepo";
import { UploadImageServices } from "../../services/uploadImageService";

export class CreateClubEvent implements UseCase<any, any> {
    private uploadImgService: UploadImageServices;
    private clubEventRepo: ClubEventRepository;

    constructor(
        uploadImgService: UploadImageServices,
        clubEventRepo: ClubEventRepository
    ) {
        this.uploadImgService = uploadImgService;
        this.clubEventRepo = clubEventRepo;
    }

    async execute(request: any) {
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

            const eventOrError = ClubEvent.create({
                clubId: ClubId.create(
                    new UniqueEntityID(request.clubId)
                ).getValue(),
                image: imgUrl,
                link: request.link,
            });

            if (eventOrError.isFailure) {
                return left(
                    Result.fail<string>(`${eventOrError.getErrorValue()}`)
                );
            }

            const event = eventOrError.getValue();

            await this.clubEventRepo.save(event);

            return right(Result.ok<void>());
        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }
    }
}
