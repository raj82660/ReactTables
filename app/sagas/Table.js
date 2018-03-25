import { call, takeEvery, put } from 'redux-saga/effects';
import { fetchTableDataAPI } from '../apiController';
import * as types from '../actions/types';

function* fetchTableData() {
    const response = yield call(fetchTableDataAPI);
    if ('status' in response && response.status === 200) {
        yield put({ type: types.FETCH_TABLE_DATA_SUCCESS, data: response.data });
    }
    // if its not 200, can fire an action showing popup. Out of scope for this task
}

function* main() {
    yield takeEvery(types.FETCH_TABLE_DATA, fetchTableData);
}

export default main;
