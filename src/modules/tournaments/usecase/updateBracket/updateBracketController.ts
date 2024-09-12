import { Request, Response } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { UpdateBracket } from "./updateBracket";
import { AppError } from "../../../../shared/core/AppError";
import { Result } from "../../../../shared/core/Result";

export class UpdateBracketCtrl extends BaseController {
	private usecase: UpdateBracket;

	constructor(usecase: UpdateBracket) {
		super();
		this.usecase = usecase;
	}

	async executeImpl(req: Request, res: Response) {
		const result = await this.usecase.execute(req.body);

		if (result.isLeft()) {
			const error = result.value;
			switch (error.constructor) {
				case AppError.NotFoundError:
					return this.notFound(
						res,
						(error as AppError.NotFoundError).getErrorValue().message,
					);
				case AppError.UnexpectedError:
					return this.fail(
						res,
						(error as AppError.UnexpectedError).getErrorValue().message,
					);
				default:
					return this.fail(res, (error as Result<string>).getErrorValue());
			}
		}

		return this.ok(res, { message: "Draw actualizado" });
	}
}
