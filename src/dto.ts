export interface Sort {
    colId: string;
    sort: string;
}

export type SortModel<S extends Sort = Sort> = S[];

export interface Filter {
    type: string;
    filter: string|number;
    filterTo?: string|number;
    filterType: any;
}

export interface FilterModel<F extends Filter = Filter> {
    [index: string]: F;
}

export class Request {
    public sortColId?: string[] = [];
    public sortType?: string[] = [];
    public filterColId?: string[] = [];
    public filterType?: string[] = [];
    public filterWord?: (string|number)[] = [];
    public filterTo?: (string|number)[] = [];
    public filterCategory?: string[] = [];
}

export class Response<T> {
    public rowsThisBlock: T[];
    public lastRow: number;
}