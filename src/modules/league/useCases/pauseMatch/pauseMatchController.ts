import { Request, Response } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { PauseMatch } from "./pauseMatch";
import { AppError } from "../../../../shared/core/AppError";
import { Result } from "../../../../shared/core/Result";

export class PauseMatchController extends BaseController {

    usecase: PauseMatch;

    constructor(usecase: PauseMatch) {
        super();
        this.usecase = usecase;
    }

    async executeImpl(req: Request, res: Response) {
        console.log("SUPER TIE", req.body['superTiebreak']);
        try {
            req.body['setsQuantity'] = Number(req.body.setsQuantity);
            req.body['gamesPerSet'] = Number(req.body.gamesPerSet);
            req.body['setsWon'] = Number(req.body.setsWon);
            req.body['setsLost'] = Number(req.body.setsLost);
            req.body['currentSetIdx'] = Number(req.body.currentSetIdx);
            req.body['initialTeam'] = JSON.parse(req.body['initialTeam'])
            req.body['superTiebreak'] = JSON.parse(req.body.superTiebreak);
            req.body['matchFinish'] = JSON.parse(req.body.matchFinish);
            req.body['matchWon'] = JSON.parse(req.body.matchWon);
            if (req.body['initialTeam'] != null) {
                req.body['initialTeam'] = Number(req.body['initialTeam']);
            }
            if (typeof req.body['tracker'] == 'string') {
                req.body['tracker'] = JSON.parse(req.body['tracker']);
            }
            if (typeof req.body['sets'] == 'string') {
                req.body['sets'] = JSON.parse(req.body['sets']);
            }
            if (typeof req.body['currentGame'] == 'string') {
                req.body['currentGame'] = JSON.parse(req.body['currentGame']);
            }
            if (typeof req.body['singleServeFlow'] == 'string') {
                req.body['singleServeFlow'] = JSON.parse(req.body['singleServeFlow']);
            }
            if (typeof req.body['doubleServeFlow'] == 'string') {
                req.body['doubleServeFlow'] = JSON.parse(req.body['doubleServeFlow']);
            }
        } catch (error) {
            return this.clientError(res, "JSON invalido");
        }

        const result = await this.usecase.execute(req.body);

        if (result.isLeft()) {
            const error = result.value
            switch (error.constructor) {
                case AppError.UnexpectedError:
                    return this.fail(res, (error as AppError.UnexpectedError).getErrorValue().message)

                case AppError.NotFoundError:
                    return this.fail(res, (error as AppError.NotFoundError).getErrorValue().message)
                default:
                    return this.clientError(res, (error as Result<string>).getErrorValue())
            }
        }

        return this.ok(res, { "message": "Partido pausado" })
    }
}
