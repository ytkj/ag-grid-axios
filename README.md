# ag-grid-axios

frontend utilities for AgGrid and Axios HTTP client, powered by TypeScript.

## Installation

`npm install -S @ytkj/ag-grid-axios`

## Usage

`DataSource` implements [datasource interface](https://www.ag-grid.com/javascript-grid-infinite-scrolling/#datasource-interface)
of AgGrid [**Infinite Scroll Model**](https://www.ag-grid.com/javascript-grid-infinite-scrolling).
passing `DataSource` instance to AgGrid `api.setDatasource()` setter method.

here is React example.

```typescript
import { DataSource } from '@ytkj/ag-grid-axios';

/* other import statements or something */

export class AgGridView extends React.Component<AgGridViewProps> {

    private gridDataSource: IDatasource;
    
    public componentDidMount(): void {
        this.gridDataSource = DataSource.factory(
            '/api/grid/start/{{startRow}}/end/{{endRow}}'
        )
    }
    
    public render(): React.ReactNode {
        return (
            <div>
                <AgGridReact
                    onGridReady={this.handleGridReady.bind(this)}
                    /* other attributes */
                />
            </div>
        );
    }
    
    private handleGridReady(param: GridReadyEvent): void {
        param.api.setDatasource(this.gridDataSource);
    }
}
```

Every time current cached rows scrolled out, AgGrid call the `DataSource` instance in appropreate timing.
The `DataSource` instance will build a HTTP request from start/end row index and `FilterModel`/`SortModel` and send it server.
Receiving response from server, the `DataSource#getRow` will pass response contents to AgGrid.

### React, Vue.js, Angular

ag-grid-axios does not depend on React, so can be used with not only React, but also Angular, Vue.js or Vanilla.

## API

### `DataSource.factory()`

static factory method to instanciate `DataSource`.

#### Arguments

|#|type|description|
|---|---|---|
|1|`string`|required parameter. this will be used as url template string, and `'{{startRow}}'` and `'{{endRow}}'` will be replaced to requesting row start/end index set by AgGrid|
|2|[`AxiosInstance`](https://github.com/axios/axios#creating-an-instance)|optional parameter. this will be used as HTTP client. default to pre-configured axios instance.|

## REST API

schema of HTTP request made by `DataSource` is described in [openapi.yaml](https://github.com/ytkj/ag-grid-axios/blob/master/openapi.yaml).
