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
export declare function queryParamFromSortFilterModel<S extends Sort = Sort, F extends Filter = Filter>(sortModel?: SortModel<S>, filterModel?: FilterModel<F>): Request;
