import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { notificatePlayers } from "../../../../shared/infra/services/firebase/fcm";
import { PlayerQuery, PlayerRepository } from "../../repositories/playerRepo";

type SendNotificationsReq = {
    clubId?: string;
    title: string;
    body: string;
};

type Response = Either<AppError.UnexpectedError | Result<string>, Result<void>>;

export class SendNotifications
    implements UseCase<SendNotificationsReq, Response>
{
    private readonly repo: PlayerRepository;

    constructor(repo: PlayerRepository) {
        this.repo = repo;
    }

    async execute(request: SendNotificationsReq): Promise<Response> {
        let tokens: Array<string> = [];

        try {
            const query: PlayerQuery = {};

            if (request.clubId) {
                query.clubId = request.clubId;
            }

            const players = await this.repo.list(query);

            for (const p of players) {
                tokens = tokens.concat(p.devices!.getItems());
            }

            const result = await notificatePlayers({
                tokens,
                title: request.title,
                body: request.body,
            });

            if (result.isFailure) {
                return left(result as Result<string>);
            }

            return right(Result.ok<void>());
        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }
    }
}
