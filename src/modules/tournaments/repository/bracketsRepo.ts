import { BracketNode } from "../domain/brackets";

export type BracketsQuery = {
    rightPlace?: number;
    leftPlace?: number;
    deep?: number;
};

export type BracketsRepository = {
    list(q: BracketsQuery): Promise<any>;
    get(q: BracketsQuery): Promise<BracketNode>;
    save(node: BracketNode): Promise<void>;
};
