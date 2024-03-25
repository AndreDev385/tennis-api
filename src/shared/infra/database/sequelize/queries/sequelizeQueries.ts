export interface PaginateQuery {
    limit?: number;
    offset?: number;
}

export type PaginateResponse<T> = {
    count: number
    rows: T[]
}

