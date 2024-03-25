import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { BracketNode } from "../../domain/brackets";
import { Tournament } from "../../domain/tournament";
import { TournamentRepository } from "../../repository/tournamentRepo";
import { BuildBracketsDto } from "./buildBracketsDto";

type Response = Either<
    AppError.UnexpectedError | AppError.NotFoundError | Result<string>,
    Result<void>
>;

export class BuildBrackets implements UseCase<BuildBracketsDto, Response> {
    private readonly tournamentRepo: TournamentRepository;

    constructor(repo: TournamentRepository) {
        this.tournamentRepo = repo;
    }

    async execute(request: BuildBracketsDto): Promise<Response> {
        let tournament: Tournament;
        let rootNode: BracketNode;

        try {
            try {
                tournament = await this.tournamentRepo.get({
                    tournamentId: request.tournamentId,
                });
            } catch (error) {
                return left(new AppError.NotFoundError(error));
            }

            const mustNode = BracketNode.create({
                deep: 1,
                rightPlace: 1,
                leftPlace: 2,
                tournamentId: tournament.tournamentId,
            });

            if (mustNode.isFailure) {
                return left(Result.fail<string>(`${mustNode.getErrorValue()}`));
            }

            rootNode = mustNode.getValue();

            buildBracketsBuilder(3, rootNode);
            //logNodes(rootNode);

            return right(Result.ok());
        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }
    }
}

function logNodes(node: BracketNode) {
    if (node.leftPlace == null || node.rightPlace == null) {
        return;
    }

    console.log(`right: ${node.rightPlace} left: ${node.leftPlace}\n`);

    logNodes(node.right!);
    logNodes(node.left!);
}

/*
 * @param: node
 * root tree node for tournament's brackets on first call
 *
 * @param: deep
 * multiples of 2 for reach the brackets tree lenght
 *
 * */
export function buildBracketsBuilder(deep: number, node: BracketNode) {
    if (node.deep >= deep) {
        return;
    }

    const nextDeep = node.deep + 1;

    if (node.right == null) {
        console.log(
            `rightP: ${node.rightPlace}`,
            `leftP: ${calculateBracketOponent(nextDeep, node.rightPlace)}`
        )
        node.right = BracketNode.create({
            deep: nextDeep,
            tournamentId: node.tournamentId,
            rightPlace: node.rightPlace,
            leftPlace: calculateBracketOponent(nextDeep, node.rightPlace),
        }).getValue();

        buildBracketsBuilder(deep, node.right);
    }

    if (node.left == null) {
        console.log(
            `rightP: ${calculateBracketOponent(nextDeep, node.leftPlace)}`,
            `leftP: ${node.leftPlace}\n`
        )
        node.left = BracketNode.create({
            deep: nextDeep,
            tournamentId: node.tournamentId,
            rightPlace: calculateBracketOponent(nextDeep, node.leftPlace),
            leftPlace: node.leftPlace,
        }).getValue();

        buildBracketsBuilder(deep, node.left);
    }
}

/*
 * @param: deep
 * multiples of 2 for reach the brackets tree lenght
 *
 * @param: firstNumber
 * number of table to calculate by deep
 *
 * @return:
 * position of the oponent player
 *
 **/
function calculateBracketOponent(deep: number, firstNumber: number): number {
    return 2 ** deep + 1 - firstNumber;
}
