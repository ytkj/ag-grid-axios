import { AxiosInstance, AxiosRequestConfig } from 'axios';
export declare const axiosConfigForAgGrid: AxiosRequestConfig;
/**
 * axios instance suitably configured for ag-grid HTTP client.
 * set array value for query parameter,
 * - default config axios instance:
 *   - "?a[]=1&a[]=2&a[]=3"
 * - this instance:
 *   - "?a=1&a=2&a=3"
 */
export declare const axiosInstanceForAgGrid: AxiosInstance;
