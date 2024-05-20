import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Mapper } from "../../../shared/infra/Mapper";
import { BracketData } from "../../../shared/infra/database/sequelize/models/tournaments/Bracket";
import { BracketNode, BracketPlace } from "../domain/brackets";
import { ContestClash } from "../domain/contestClash";
import { ContestId } from "../domain/contestId";
import { Phase, PhaseValues } from "../domain/phase";
import { TournamentMatch } from "../domain/tournamentMatch";
import { BracketDto } from "../dtos/bracketDto";
import { ContestClashMap } from "./ContestClashMap";
import { TournamentMatchMap } from "./TournamentMatchMap";

export type BuildBracketData = {
    id: string;
    phase: PhaseValues;
    contestId: string;
    match?: TournamentMatch | null;
    clash?: ContestClash | null;
    left?: BracketNode | null;
    right?: BracketNode | null;
    parent?: BracketNode | null;
    rightPlace: BracketPlace;
    leftPlace: BracketPlace;
    deep: number;
};

export class BracketMap implements Mapper<BracketNode> {
    public static forQuery(
        node: BracketData & { match: TournamentMatch | null, clash: ContestClash | null }
    ): BracketDto {
        return {
            id: node.id,
            contestId: node.contestId,
            matchId: node.matchId,
            match: node.match != null ? TournamentMatchMap.toDto(node.match) : null,
            clash: node.clash != null ? ContestClashMap.toDto(node.clash) : null,
            left: node.left,
            right: node.right,
            parent: node.parent,
            rightPlace: JSON.parse(node.rightPlace),
            leftPlace: JSON.parse(node.leftPlace),
            phase: node.phase,
            deep: node.deep,
        };
    }

    public static toDomain(raw: BuildBracketData) {
        const mustNode = BracketNode.create(
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

    public static toPersistance(node: BracketNode) {
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
