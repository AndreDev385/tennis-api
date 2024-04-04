import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Mapper } from "../../../shared/infra/Mapper";
import { BracketData } from "../../../shared/infra/database/sequelize/models/Bracket";
import { BracketNode, BracketPlace } from "../domain/brackets";
import { ContestId } from "../domain/contestId";
import { TournamentMatch } from "../domain/tournamentMatch";

export type BuildBracketData = {
    id: string;
    contestId: string;
    match?: TournamentMatch | null;
    left?: BracketNode | null;
    right?: BracketNode | null;
    parent?: BracketNode | null;
    rightPlace: BracketPlace;
    leftPlace: BracketPlace;
    deep: number;
};

export class BracketMap implements Mapper<BracketNode> {
    public static forQuery(
        node: BracketData & { match: TournamentMatch | null }
    ) {
        return {
            id: node.id,
            contestId: node.contestId,
            match: node.match,
            left: node.left,
            right: node.right,
            parent: node.parent,
            rightPlace: JSON.parse(node.rightPlace),
            leftPlace: JSON.parse(node.leftPlace),
            deep: node.deep,
        };
    }

    public static toDomain(raw: BuildBracketData) {
        const mustNode = BracketNode.create(
            {
                ...raw,
                match: raw.match ?? null,
                parent: raw.parent ?? null,
                right: raw.right ?? null,
                left: raw.left ?? null,
                contestId: ContestId.create(
                    new UniqueEntityID(raw.contestId)
                ).getValue(),
            },
            new UniqueEntityID(raw.id)
        );

        mustNode.isFailure ?? console.log(mustNode.getErrorValue());

        return mustNode.isSuccess ? mustNode.getValue() : null;
    }

    public static toPersistance(node: BracketNode) {
        return {
            id: node.id.toString(),
            contestId: node.contestId.id.toString(),
            deep: node.deep,
            rightPlace: JSON.stringify({
                value: node.rightPlace.value,
                participantId: node.rightPlace.participant?.participantId.id.toString(),
                coupleId: node.rightPlace.couple?.coupleId.id.toString(),
            }),
            leftPlace: JSON.stringify({
                value: node.leftPlace.value,
                participantId: node.leftPlace.participant?.participantId.id.toString(),
                coupleId: node.leftPlace.couple?.coupleId.id.toString(),
            }),
            right: node.right?.id.toString() ?? null,
            left: node.left?.id.toString() ?? null,
            parent: node.parent?.id.toString() ?? null,
            matchId: node.match?.matchId.id.toString() ?? null,
        };
    }
}
