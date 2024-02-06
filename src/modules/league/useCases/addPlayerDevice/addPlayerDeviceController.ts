import { Response } from "express";
import { AddPlayerDevice } from "./addPlayerDevice";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { AppError } from "../../../../shared/core/AppError";
import { DecodedRequest } from "../../../users/infra/http/models/decodedRequest";

export class AddPlayerDeviceController extends BaseController {
    private readonly usecase: AddPlayerDevice;

    constructor(usecase: AddPlayerDevice) {
        super()
        this.usecase = usecase
    }

    async executeImpl(req: DecodedRequest, res: Response) {

        const { userId } = req.decoded;

        const result = await this.usecase.execute({ ...req.body, userId });

        if (result.isLeft()) {
            const error = result.value
            switch (error.constructor) {
                case AppError.UnexpectedError:
                    return this.fail(res, error.getErrorValue().message)
                case AppError.NotFoundError:
                    return this.notFound(res, error.getErrorValue().message)
            }
        }

        return this.ok(res, { message: "Dispositivo agregado con exito" })
    }
}

