import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { stringify } from 'qs';

export const axiosConfigForAgGrid: AxiosRequestConfig = {
    paramsSerializer: (
        params: {[key: string]: any}
    ): string => {
        return stringify(params, {
            arrayFormat: 'repeat'
        });
    },
    headers: {
        'Cache-Control': 'no-cache,no-store,must-revalidate,max-age=-1,private',
        'Expires': -1,
        'Pragma': 'no-cache',
    }
};

/**
 * axios instance suitably configured for ag-grid HTTP client.
 * set array value for query parameter,
 * - default config axios instance:
 *   - "?a[]=1&a[]=2&a[]=3"
 * - this instance:
 *   - "?a=1&a=2&a=3"
 */
export const axiosInstanceForAgGrid: AxiosInstance = axios.create(axiosConfigForAgGrid);
