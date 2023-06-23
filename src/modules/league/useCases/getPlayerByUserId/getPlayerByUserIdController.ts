import { Response } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { DecodedRequest } from "../../../users/infra/http/models/decodedRequest";
import { GetPlayerByUserId } from "./getPlayerByUserId";

export class GetPlayerByUserIdController extends BaseController {

    usecase: GetPlayerByUserId;

    constructor(usecase: GetPlayerByUserId) {
        super()
        this.usecase = usecase;
    }

    async executeImpl(req: DecodedRequest, res: Response) {

    }

}
