import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { Player } from "../../domain/player";
import { PlayerRepository } from "../../repositories/playerRepo";
import { UploadImageServices } from "../../services/uploadImageService";

type Response = Either<
    AppError.NotFoundError | AppError.UnexpectedError | Result<string>,
    Result<void>
>;

export class AddPlayerAvatar implements UseCase<any, Response> {
    private uploadImgService: UploadImageServices;
    private playerRepo: PlayerRepository;

    constructor(
        playerRepo: PlayerRepository,
        uploadImgService: UploadImageServices
    ) {
        this.playerRepo = playerRepo;
        this.uploadImgService = uploadImgService;
    }

    async execute(request: any): Promise<Response> {
        let imgUrl: string;
        let player: Player;

        try {
            try {
                player = await this.playerRepo.getPlayerByUserId(request.userId);
            } catch (error) {
                return left(new AppError.NotFoundError(error));
            }

            try {
                imgUrl = await this.uploadImgService.upload(request.file.path);
            } catch (error) {
                console.log(error)
                return left(
                    Result.fail<string>(
                        "Ha ocurrido un error al subir el archivo"
                    )
                );
            }

            player.addAvatar(imgUrl);

            await this.playerRepo.save(player);

            return right(Result.ok<void>());
        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }
    }
}
