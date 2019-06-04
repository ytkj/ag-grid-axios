import MockAdapter from 'axios-mock-adapter';
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Response } from '..';

export const URL_FOR_TEST = '/api/grid[10:12]';
export interface Row {
    id: number;
    value: string;
}

export function wrapForMock(axiosInstance: AxiosInstance): AxiosInstance {
    const mock = new MockAdapter(axiosInstance);
    mock.onGet(URL_FOR_TEST).reply((config: AxiosRequestConfig): [number, Response<Row>] => {
        return [200, {
            rowsThisBlock: [{
                id: 10,
                value: 'val10'
            }, {
                id: 11,
                value: 'val11',
            }],
            lastRow: 100,
        }];
    });
    return axiosInstance;
}

