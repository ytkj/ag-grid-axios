import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import axios from 'axios';

import { axiosInstanceForAgGrid, queryParamFromSortFilterModel, SortModel, FilterModel, DataSource } from '../';
import { wrapForMock, URL_FOR_TEST, Row } from './mock';

const axiosInstance = wrapForMock(axiosInstanceForAgGrid);
const sortModel: SortModel = [{
    colId: 'sortCol1',
    sort: 'asc',
}, {
    colId: 'sortCol2',
    sort: 'desc',
}];
const filterModel: FilterModel = {
    'filterCol1': {
        type: 'equals',
        filter: 'filter1',
        filterTo: 'filterTo1',
        filterType: 'filterType1'
    },
    'filterCol2': {
        type: 'notEqual',
        filter: 'filter2',
        filterTo: 'filterTo2',
        filterType: 'filterType2'
    },            
};
const filterModel2: FilterModel = {
    'filterCol1': {
        type: 'equals',
        filter: 'filter1',
        filterType: 'Category'
    },
    'filterCol2': {
        type: 'inRange',
        filter: 10,
        filterTo: 20,
        filterType: 'number',
    }
};

describe('queryParamFromFilterSortModel', function() {

    const params = queryParamFromSortFilterModel(sortModel, filterModel);

    describe('sortModel', function() {

        it('sortColId and sortType shoul be built.', function() {
            expect(params.sortColId).to.have.ordered.members(['sortCol1', 'sortCol2']);
            expect(params.sortType).to.have.ordered.members(['asc','desc']);
        });    
    });
    
    describe('filterModel', function() {

        it('filter* should be built', function() {
            expect(params.filterColId).to.have.ordered.members(['filterCol1', 'filterCol2']);
            expect(params.filterType).to.have.ordered.members(['equals', 'notEqual']);
            expect(params.filterWord).to.have.ordered.members(['filter1', 'filter2']);
            expect(params.filterTo).to.have.ordered.members(['filterTo1', 'filterTo2']);
            expect(params.filterCategory).to.have.ordered.members(['filterType1', 'filterType2']);
        });

        const params2 = queryParamFromSortFilterModel(undefined, filterModel2);
    
        it('second inRange condition should be built', function() {
            expect(params2.filterTo).to.have.ordered.members([undefined, 20]);
        });
    });
});

describe('axiosInstanceForAgGrid', function() {

    const params = queryParamFromSortFilterModel(sortModel, filterModel);
    const uri = axiosInstance.getUri({params, url: URL_FOR_TEST});

    it('SortModel should be build into query param', function() {
        expect(uri).to.have.string('sortColId=sortCol1');
        expect(uri).to.have.string('sortColId=sortCol2');
        expect(uri).to.have.string('sortType=asc');
        expect(uri).to.have.string('sortType=desc');
    });

    it('FilterModel should be build into query param', function() {
        expect(uri).to.have.string('filterColId=filterCol1');
        expect(uri).to.have.string('filterColId=filterCol2');
        expect(uri).to.have.string('filterType=equals');
        expect(uri).to.have.string('filterType=notEqual');
        expect(uri).to.have.string('filterWord=filter1');
        expect(uri).to.have.string('filterWord=filter2');
        expect(uri).to.have.string('filterTo=filterTo1');
        expect(uri).to.have.string('filterTo=filterTo2');
        expect(uri).to.have.string('filterCategory=filterType1');
        expect(uri).to.have.string('filterCategory=filterType2');
    });
});

describe('DataSource', function() {

    let resultRows: Row[],
        resultLastRow: number;
    const getRowsParam = {
        startRow: 10,
        endRow: 12,
        sortModel,
        filterModel,
        successCallback: (rows: Row[], lastRow: number) => {
            resultRows = rows;
            resultLastRow = lastRow;
        }
    }

    it('factory', function() {
        const dataSource = DataSource.factory(
            '/api/grid[{{startRow}}:{{endRow}}]',
            axiosInstance,
        );
        expect(dataSource.getRows).to.be.a('function');
    });

    it('getRows', function(done) {
        const dataSource = DataSource.factory(
            '/api/grid[{{startRow}}:{{endRow}}]',
            axiosInstance,
        );
        dataSource.getRows(getRowsParam as any);
        setTimeout(function() {
            expect(resultRows[0]).to.have.property('id', 10);
            expect(resultRows[1]).to.have.property('id', 11);
            expect(resultLastRow).to.equal(100);    
            done();
        }, 10);
    })
});