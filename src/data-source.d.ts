import { IDatasource, IGetRowsParams } from 'ag-grid';
/**
 * DataSource class for AgGrid 'Infinite Scroll' mode.
 */
export declare class DataSource<T> implements IDatasource {
    private urlTemplate;
    constructor(urlTemplate: string);
    getRows(getRowsparams: IGetRowsParams): void;
    /**
     * factory method to get this class instance.
     *
     * @param urlTemplate url template string.
     *     '{{startRow}}' and `{{endRow}} will be replaced to
     *     suitable number for current request.
     *     (ex) "/api/grid/start/{{startRow}}/end/{{endRow}}"
     */
    static factory<T>(urlTemplate: string): DataSource<T>;
}
