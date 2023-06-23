import { Response } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { CreatePlayer } from "./createPlayer";
import { DecodedRequest } from "../../../users/infra/http/models/decodedRequest";
import { CreatePlayerDto } from "./createPlayerDto";
import { AppError } from "../../../../shared/core/AppError";
import { CreatePlayerErrors } from "./createPlayerError";

export class CreatePlayerController extends BaseController {
    usecase: CreatePlayer;

    constructor(usecase: CreatePlayer) {
        super();
        this.usecase = usecase;
    }

    async executeImpl(req: DecodedRequest, res: Response) {
        const dto: CreatePlayerDto = {
            ...req.body,
            userId: req.decoded.userId,
        };

        const result = await this.usecase.execute(dto);

        if (result.isLeft()) {
            const error = result.value;
            switch (error.constructor) {
                case AppError.UnexpectedError:
                    return this.fail(res, error.getErrorValue().message);

                case CreatePlayerErrors.UserDoesNotExist:
                    return this.clientError(res, error.getErrorValue().message);

                case CreatePlayerErrors.ClubDoesNotExist:
                    return this.clientError(res, error.getErrorValue().message);

                case CreatePlayerErrors.PlayerAlreadyExistError:
                    return this.conflict(res, error.getErrorValue().message);

                default:
                    return this.clientError(res, error.getErrorValue());
            }
        }

        return this.ok(res, { message: "Jugador agregado" });
    }
}
