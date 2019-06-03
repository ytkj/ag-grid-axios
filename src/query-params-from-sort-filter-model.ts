import { Request, Filter, FilterModel, Sort, SortModel } from './dto';

/**
 * query param builder from ag-grid FilterModel and SortModel.
 * 
 * (ex)
 * ```
 * params = queryParamFromSortFilterModel(api.getSortModel(), api.getFilterModel());
 * axios.get(url, {params});
 * ```
 */
export function queryParamFromSortFilterModel<S extends Sort = Sort, F extends Filter = Filter>(
    sortModel: SortModel<S> = [],
    filterModel: FilterModel<F> = {}
): Request {

    let queryParam: Request = new Request();

    if (sortModel.length > 0) {
        queryParam.sortColId = sortModel.map(m => m.colId);
        queryParam.sortType = sortModel.map(m => m.sort);
    }
    let filterColId = Object.keys(filterModel);
    queryParam.filterColId = filterColId;
    queryParam.filterType = filterColId.map(colId => filterModel[colId].type);
    queryParam.filterWord = filterColId.map(colId => filterModel[colId].filter);
    queryParam.filterTo = filterColId.map(colId => filterModel[colId].filterTo);
    queryParam.filterCategory = filterColId.map(colId => filterModel[colId].filterType);

    return queryParam;
}