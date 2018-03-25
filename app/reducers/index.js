import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import * as types from '../actions/types';

const initialState = {
    tableInfo: [],
};
const data = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_TABLE_DATA_SUCCESS:
            return Object.assign({}, state, {tableInfo: action.data});
        default:
            return state;
    }
};


const rootReducer = combineReducers({
    data,
    routing
});

export default rootReducer;
