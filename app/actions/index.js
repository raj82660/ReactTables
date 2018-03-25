import * as types from './types';

export function fetchData() {
    return {
        type: types.FETCH_TABLE_DATA,
    };
}
