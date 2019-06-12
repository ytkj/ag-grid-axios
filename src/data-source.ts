import { IDatasource, IGetRowsParams } from 'ag-grid-community';
import { AxiosResponse, AxiosInstance } from 'axios';

import { Request, Response} from './dto';
import { axiosInstanceForAgGrid } from './axios-instance';
import { queryParamFromSortFilterModel } from './query-params-from-sort-filter-model';

/**
 * DataSource class for AgGrid 'Infinite Scroll' mode.
 */
export class DataSource<T> implements IDatasource {

    constructor(
        private urlTemplate: string,
        private axiosInstance: AxiosInstance,
    ) {}

    public getRows(
        getRowsparams: IGetRowsParams,
    ): void {

        let url = this.urlTemplate
            .replace('{{startRow}}', `${getRowsparams.startRow}`)
            .replace('{{endRow}}', `${getRowsparams.endRow}`);
        
        let params: Request = queryParamFromSortFilterModel(
            getRowsparams.sortModel,
            getRowsparams.filterModel,
        );

        this.axiosInstance.get(url, {params}).then((res: AxiosResponse<Response<T>>): void => {
            getRowsparams.successCallback(res.data.rowsThisBlock, res.data.lastRow);
        });
    }

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
    public static factory<T>(
        urlTemplate: string,
        axiosInstance: AxiosInstance = axiosInstanceForAgGrid
    ): DataSource<T> {
        return new DataSource<T>(urlTemplate, axiosInstance);
    }
}
