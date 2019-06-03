export interface Sort {
    colId: string;
    sort: string;
}
export declare type SortModel<S extends Sort = Sort> = S[];
export interface Filter {
    type: string;
    filter: string | number;
    filterTo?: string | number;
    filterType: any;
}
export interface FilterModel<F extends Filter = Filter> {
    [index: string]: F;
}
export declare class Request {
    sortColId?: string[];
    sortType?: string[];
    filterColId?: string[];
    filterType?: string[];
    filterWord?: (string | number)[];
    filterTo?: (string | number)[];
    filterCategory?: string[];
}
export declare class Response<T> {
    rowsThisBlock: T[];
    lastRow: number;
}
