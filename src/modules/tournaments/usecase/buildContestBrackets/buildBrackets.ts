import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { BracketNode, BracketPlace } from "../../domain/brackets";
import { Contest } from "../../domain/contest";
import { BracketsRepository } from "../../repository/bracketsRepo";
import { ContestRepository } from "../../repository/contestRepo";
import {
    buildBracketsBuilder,
    calculateDeepByParticipants,
} from "../../services/bracketsBuilder";
import { BuildBracketsDto } from "./buildBracketsDto";

type Response = Either<
    AppError.UnexpectedError | AppError.NotFoundError | Result<string>,
    Result<void>
>;

export class BuildBrackets implements UseCase<BuildBracketsDto, Response> {
    private readonly bracketRepo: BracketsRepository;
    private readonly contestRepo: ContestRepository;

    constructor(
        bracketRepo: BracketsRepository,
        contestRepo: ContestRepository
    ) {
        this.bracketRepo = bracketRepo;
        this.contestRepo = contestRepo;
    }

    async execute(req: BuildBracketsDto): Promise<Response> {
        let contest: Contest;
        let rootNode: BracketNode;

        try {
            try {
                contest = await this.contestRepo.get({
                    contestId: req.contestId,
                });
            } catch (error) {
                return left(new AppError.NotFoundError(error));
            }

            if (contest.inscribed.getItems().length < 2) {
                return left(
                    Result.fail<string>(
                        "Deben estar inscritos al menos 2 participantes"
                    )
                );
            }

            const mustNode = BracketNode.create({
                deep: 1,
                rightPlace: BracketPlace.create({ value: 1 }).getValue(),
                leftPlace: BracketPlace.create({ value: 2 }).getValue(),
                contestId: contest.contestId,
            });

            if (mustNode.isFailure) {
                return left(Result.fail<string>(`${mustNode.getErrorValue()}`));
            }

            rootNode = mustNode.getValue();

            const deep = calculateDeepByParticipants(
                contest.inscribed.getItems().length
            );

            // copy array
            const inscribedCopy = contest.inscribed.getItems().map((i) => i);

            // sort
            inscribedCopy.sort(
                (a, b) => (a.position ?? 999) - (b.position ?? 999)
            );

            // check positions are complete and assign numbers to null values
            for (let idx = 0; idx < inscribedCopy.length; idx++) {
                if (inscribedCopy[idx].position == null) {
                    inscribedCopy[idx].setPosition(idx + 1);
                }
                if (inscribedCopy[idx].position != idx + 1) {
                    return left(
                        Result.fail<string>(
                            "Hay una posicion faltante en los inscritos"
                        )
                    );
                }
            }

            buildBracketsBuilder(deep, rootNode, inscribedCopy);

            await this.bracketRepo.saveTree(rootNode);

            return right(Result.ok());
        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }
    }
}
