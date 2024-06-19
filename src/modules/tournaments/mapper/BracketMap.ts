import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Mapper } from "../../../shared/infra/Mapper";
import { BracketTreeNode, BracketPlace, BracketNode } from "../domain/brackets";
import { ContestClash } from "../domain/contestClash";
import { ContestClashId } from "../domain/contestClashId";
import { ContestId } from "../domain/contestId";
import { Phase, PhaseValues } from "../domain/phase";
import { TournamentMatch } from "../domain/tournamentMatch";
import { TournamentMatchId } from "../domain/tournamentMatchId";

export type BuildBracketTreeNodeData = {
    id: string;
    phase: PhaseValues;
    contestId: string;
    match?: TournamentMatch | null;
    clash?: ContestClash | null;
    left?: BracketTreeNode | null;
    right?: BracketTreeNode | null;
    parent?: BracketTreeNode | null;
    rightPlace: BracketPlace;
    leftPlace: BracketPlace;
    deep: number;
};

export class BracketTreeNodeMap implements Mapper<BracketTreeNode> {
    public static toDomain(raw: BuildBracketTreeNodeData) {
        const mustNode = BracketTreeNode.create(
            {
                ...raw,
                phase: Phase.create(raw.phase).getValue(),
                match: raw.match ?? null,
                clash: raw.clash ?? null,
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

    public static toPersistance(node: BracketTreeNode) {
        return {
            id: node.id.toString(),
            contestId: node.contestId.id.toString(),
            phase: node.phase.value,
            deep: node.deep,
            rightPlace: JSON.stringify({
                value: node.rightPlace.value,
                participantId:
                    node.rightPlace.participant?.participantId.id.toString(),
                coupleId: node.rightPlace.couple?.coupleId.id.toString(),
                contestTeamId: node.rightPlace.contestTeam?.contestTeamId.id.toString(),
            }),
            leftPlace: JSON.stringify({
                value: node.leftPlace.value,
                participantId:
                    node.leftPlace.participant?.participantId.id.toString(),
                coupleId: node.leftPlace.couple?.coupleId.id.toString(),
                contestTeamId: node.leftPlace.contestTeam?.contestTeamId.id.toString(),
            }),
            right: node.right?.id.toString() ?? null,
            left: node.left?.id.toString() ?? null,
            parent: node.parent?.id.toString() ?? null,
            matchId: node.match?.matchId.id.toString() ?? null,
            clashId: node.clash?.contestClashId.id.toString(),
        };
    }
}

export class BracketNodeMap implements Mapper<BracketNode> {
    public static toDomain(raw: any & { rightPlaceObj: BracketPlace, leftPlaceObj: BracketPlace }) {
        return BracketNode.create({
            contestId: ContestId.create(new UniqueEntityID(raw.contestId)).getValue(),
            matchId: raw.matchId ? TournamentMatchId.create(new UniqueEntityID(raw.matchId)).getValue() : null,
            clashId: raw.clashId ? ContestClashId.create(new UniqueEntityID(raw.clashId)).getValue() : null,
            leftId: raw.left ? new UniqueEntityID(raw.left) : null,
            rightId: raw.right ? new UniqueEntityID(raw.right) : null,
            parentId: raw.parent ? new UniqueEntityID(raw.parent) : null,
            rightPlace: raw.rightPlaceObj,
            leftPlace: raw.leftPlaceObj,
            phase: Phase.create(raw.phase).getValue(),
            deep: raw.deep,
        }, new UniqueEntityID(raw.id)).getValue()
    }

    public static toPersistance(node: BracketNode) {
        return {
            id: node.id.toString(),
            contestId: node.contestId.id.toString(),
            matchId: node.matchId?.id.toString()!,
            clashId: node.clashId?.id.toString()!,
            left: node.leftId?.toString()!,
            right: node.rightId?.toString()!,
            parent: node.parentId?.toString()!,
            rightPlace: JSON.stringify({
                value: node.rightPlace.value,
                participantId:
                    node.rightPlace.participant?.participantId.id.toString(),
                coupleId: node.rightPlace.couple?.coupleId.id.toString(),
                contestTeamId: node.rightPlace.contestTeam?.contestTeamId.id.toString(),
            }),
            leftPlace: JSON.stringify({
                value: node.leftPlace.value,
                participantId:
                    node.leftPlace.participant?.participantId.id.toString(),
                coupleId: node.leftPlace.couple?.coupleId.id.toString(),
                contestTeamId: node.leftPlace.contestTeam?.contestTeamId.id.toString(),
            }),
            phase: node.phase.value,
            deep: node.deep,
        }
    }
}
