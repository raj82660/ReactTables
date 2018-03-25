import { fork } from 'redux-saga/effects';
import Table from './Table';

function* main() {
    yield [
        fork(Table),
    ];
}

export default main;
