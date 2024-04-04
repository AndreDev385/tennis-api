import { BracketNode } from "../domain/brackets";
import { BracketDto } from "../dtos/bracketDto";

export type BracketsQuery = {
    contestId?: string;
    id?: string;
    rightPlace?: number;
    leftPlace?: number;
    deep?: number;
};

export type BracketsRepository = {
    list(q: BracketsQuery): Promise<BracketDto[]>;
    get(q: BracketsQuery): Promise<BracketNode>;
    save(node: BracketNode): Promise<void>;
    saveTree(node: BracketNode): Promise<void>;
};
