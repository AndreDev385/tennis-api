import { Request, Response } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { ForgetPasswordUseCase } from "./forgetPasswordUseCase";
import { ForgetPasswordDto } from "./forgetPasswordDto";

export class ForgetPasswordController extends BaseController {
    private useCase: ForgetPasswordUseCase;

    constructor(useCase: ForgetPasswordUseCase) {
        super();
        this.useCase = useCase;
    }

    async executeImpl(req: Request, res: Response) {
        let dto: ForgetPasswordDto = req.body;

        try {
            await this.useCase.execute(dto);
            this.ok(res);
        } catch (e) {
            this.fail(res, e);
        }
    }
}
