import createHistory from 'history/createBrowserHistory';
import { applyMiddleware, createStore } from 'redux';
// import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';
import sagas from '../sagas/index';

export const history = createHistory();
// const middleware = routerMiddleware(history);
const sagaMiddleware = createSagaMiddleware();

export function configureStore(initialState) {
    const store =  createStore(
        rootReducer,
        initialState,
        applyMiddleware(sagaMiddleware)
    );
    sagaMiddleware.run(sagas);
    return store;
}
