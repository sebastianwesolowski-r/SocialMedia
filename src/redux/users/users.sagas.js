import {takeLatest, all, call, put} from 'redux-saga/effects';

import {firestore, convertUsersSnapshotToMap} from '../../firebase/firebase';

import {fetchUsersSuccess, fetchUsersFailure} from './users.actions';

import UsersActionTypes from './users.types';

export function* fetchUsers() {
    try {
        const usersRef = firestore.collection('users');
        const snapshot = yield usersRef.get();
        const usersMap = yield call(convertUsersSnapshotToMap, snapshot);
        yield put(fetchUsersSuccess(usersMap));
    } catch(error) {
        yield put(fetchUsersFailure(error.message));
    }
}

export function* fetchUsersStart() {
    yield takeLatest(UsersActionTypes.FETCH_USERS_START, fetchUsers);
}

export function* usersSagas() {
    yield all([call(fetchUsersStart)]);
}