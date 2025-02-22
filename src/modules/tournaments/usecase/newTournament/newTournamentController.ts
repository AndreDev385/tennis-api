import { Request, Response } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { NewTournament } from "./newTournament";
import { AppError } from "../../../../shared/core/AppError";
import { Result } from "../../../../shared/core/Result";

export class NewTournamentController extends BaseController {
	private readonly usecase: NewTournament;

	constructor(usecase: NewTournament) {
		super();
		this.usecase = usecase;
	}

	async executeImpl(req: Request, res: Response) {
		const {
			name,
			gamesPerSet,
			setsQuantity,
			matchesPerClash,
			goldenPoint,
			startDate,
			endDate,
			address,
		} = req.body;

		console.log(req.body);

		const result = await this.usecase.execute({
			name,
			goldenPoint: JSON.parse(goldenPoint),
			gamesPerSet: Number(gamesPerSet),
			setsQuantity: Number(setsQuantity),
			matchesPerClash: Number(matchesPerClash) as any,
			address,
			startDate,
			endDate,
			file: req.file,
		});

		if (result.isLeft()) {
			const error = result.value;
			switch (error.constructor) {
				case AppError.UnexpectedError:
					return this.fail(
						res,
						(error as AppError.UnexpectedError).getErrorValue().message,
					);
				case AppError.NotFoundError:
					return this.clientError(
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

		return this.ok(res, { message: "Nuevo torneo agregado" });
	}
}
