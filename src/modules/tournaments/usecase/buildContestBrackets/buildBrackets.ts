import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { BracketTreeNode, BracketPlace } from "../../domain/brackets";
import { Contest } from "../../domain/contest";
import { Phase, mapPhaseToString } from "../../domain/phase";
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
        let rootNode: BracketTreeNode;

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

            const maybePhase = Phase.create(req.phase);

            if (maybePhase.isFailure) {
                return left(
                    Result.fail<string>(`${maybePhase.getErrorValue()}`)
                );
            }

            const phase = maybePhase.getValue();

            const bracketsAlreadyExist = await this.bracketRepo.list({
                contestId: req.contestId,
                phase: phase.value,
            });

            if (bracketsAlreadyExist.length > 0) {
                return left(
                    Result.fail<string>(
                        `Las llaves de la tabla ${mapPhaseToString(phase)} ya han sido creadas`
                    )
                );
            }

            const mustNode = BracketTreeNode.create({
                deep: 1,
                phase: phase,
                rightPlace: BracketPlace.create({ value: 1 }).getValue(),
                leftPlace: BracketPlace.create({ value: 2 }).getValue(),
                contestId: contest.contestId,
            });

            if (mustNode.isFailure) {
                return left(Result.fail<string>(`${mustNode.getErrorValue()}`));
            }

            rootNode = mustNode.getValue();

            // TODO: fix participants for build the brackets
            // it must be dinamic depending on the phase
            const deep = calculateDeepByParticipants(
                contest.inscribed.getItems().length
            );

            // copy array
            const inscribedWithPosition = contest.inscribed.getItems().filter((i) => i.position != null)
            const inscribedWithoutPosition = contest.inscribed.getItems().filter((i) => i.position == null)

            shuffle(inscribedWithoutPosition);

            const inscribedCopy = inscribedWithPosition.concat(inscribedWithoutPosition);

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

function shuffle(array: Array<any>): void {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
