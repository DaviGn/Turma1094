export interface PaginationData {
    page: number;
    perPage: number;
}

export interface PaginationResponse<T> {
    first: number;
    prev: number | null;
    next: number | null;
    last: number;
    pages: number;
    items: number;
    data: T[];
}
