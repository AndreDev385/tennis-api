import { Request, Response } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { CreateParticipant } from "./createParticipant";
import { AppError } from "../../../../shared/core/AppError";
import { Result } from "../../../../shared/core/Result";

export class CreateParticipantCtrl extends BaseController {
	private readonly uc: CreateParticipant;

	constructor(uc: CreateParticipant) {
		super();
		this.uc = uc;
	}

	async executeImpl(req: Request, res: Response) {
		const result = await this.uc.execute(req.body);

		if (result.isLeft()) {
			const error = result.value;
			switch (error.constructor) {
				case AppError.UnexpectedError:
					return this.fail(
						res,
						(error as AppError.UnexpectedError).getErrorValue().message,
					);
				default:
					return this.clientError(
						res,
						(error as Result<string>).getErrorValue(),
					);
			}
		}

		return this.ok(res, { message: "Participante creado" });
	}
}
