import { IDatasource, IGetRowsParams } from 'ag-grid';
import { AxiosInstance } from 'axios';
/**
 * DataSource class for AgGrid 'Infinite Scroll' mode.
 */
export declare class DataSource<T> implements IDatasource {
    private urlTemplate;
    private axiosInstance;
    constructor(urlTemplate: string, axiosInstance: AxiosInstance);
    getRows(getRowsparams: IGetRowsParams): void;
    /**
     * factory method to get this class instance.
     *
     * @param urlTemplate url template string.
     *     '{{startRow}}' and `{{endRow}} will be replaced to
     *     suitable number for current request.
     *     (ex) "/api/grid/start/{{startRow}}/end/{{endRow}}"
     * @param axiosInstance Axios Instance for HTTP request.
     *     default to axiosInstanceForAgGrid.
     */
    static factory<T>(urlTemplate: string, axiosInstance?: AxiosInstance): DataSource<T>;
}
