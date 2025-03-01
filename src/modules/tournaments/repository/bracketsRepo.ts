import { BracketNode, BracketTreeNode } from "../domain/brackets";
import { BracketDto } from "../dtos/bracketDto";

export type BracketsQuery = {
    contestId?: string;
    phase?: number;
    id?: string;
    matchId?: string;
    clashId?: string;
    rightPlace?: number;
    leftPlace?: number;
    deep?: number;
};

export type BracketsRepository = {
    list(q: BracketsQuery): Promise<BracketDto[]>;
    get(q: BracketsQuery): Promise<BracketNode>;
    save(node: BracketNode): Promise<void>;
    saveTree(node: BracketTreeNode): Promise<void>;
    delete(q: BracketsQuery): Promise<void>;
};
