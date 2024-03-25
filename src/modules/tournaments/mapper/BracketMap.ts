import { Mapper } from "../../../shared/infra/Mapper";
import { BracketData } from "../../../shared/infra/database/sequelize/models/BracketModel";
import { BracketNode } from "../domain/brackets";
import { TournamentId } from "../domain/tournamentId";
import { TournamentMatch } from "../domain/tournamentMatch";

export type BuildBracketData = {
    id: string;
    tournamentId: TournamentId;
    match: TournamentMatch | null;
    left: BracketNode | null;
    right: BracketNode | null;
    parent: BracketNode | null;
    rightPlace: number;
    leftPlace: number;
    deep: number;
};

export class BracketMap implements Mapper<BracketNode> {
    public static forQuery(node: BracketData & { match: TournamentMatch | null }) {
        return {
            id: node.id,
            tournamentId: node.tournamentId,
            match: node.match,
            left: node.left,
            right: node.right,
            parent: node.parent,
            rightPlace: node.rightPlace,
            leftPlace: node.leftPlace,
            deep: node.deep,
        };
    }

    public static toDomain(raw: BuildBracketData) {
        const mustNode = BracketNode.create(raw);

        mustNode.isFailure ?? console.log(mustNode.getErrorValue());

        return mustNode.isSuccess ? mustNode.getValue() : null;
    }

    public static toPersistance(node: BracketNode) {
        return {
            id: node.id.toString(),
            tournamentId: node.tournamentId.id.toString(),
            deep: node.deep,
            rightPlace: node.rightPlace,
            leftPlace: node.leftPlace,
            right: node.right ? node.right.id.toString() : null,
            left: node.left ? node.left.id.toString() : null,
            parent: node.parent ? node.parent.id.toString() : null,
            matchId: node.match ? node.match.matchId.id.toString() : null,
        };
    }
}
