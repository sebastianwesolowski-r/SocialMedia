import {takeLatest, put, all, call} from 'redux-saga/effects';

import UserActionTypes from './user.types';

import {signInSuccess, signInFailure, signOutStart, signOutSuccess, signOutFailure, signUpSuccess, signUpFailure, userIsNull} from './user.actions';

import {fetchUsersStart} from '../users/users.actions';

import {auth, googleProvider, firestore ,createUserProfile, getCurrentUser, deleteUserAccount} from '../../firebase/firebase';
import firebase from '../../firebase/firebase';

export function* followUser({payload: {user, currentUserData}}) {
    const userToFollowRef = yield firestore.doc(`users/${user.id}`);
    const currentUserRef = yield firestore.doc(`users/${currentUserData.id}`);
    yield userToFollowRef.update({
        followers: firebase.firestore.FieldValue.arrayUnion(currentUserData.displayName)
    });
    yield currentUserRef.update({
        following: firebase.firestore.FieldValue.arrayUnion(user.displayName)
    });
    yield put(fetchUsersStart());
}

export function* unfollowUser({payload: {user, currentUserData}}) {
    const userToUnfollowRef = yield firestore.doc(`users/${user.id}`);
    const currentUserRef = yield firestore.doc(`users/${currentUserData.id}`);
    yield userToUnfollowRef.update({
        followers: firebase.firestore.FieldValue.arrayRemove(currentUserData.displayName)
    });
    yield currentUserRef.update({
        following: firebase.firestore.FieldValue.arrayRemove(user.displayName)
    });
    yield put(fetchUsersStart());
}

export function* getSnapshotFromUser(userAuth, additionalData) {
    try {
        const userRef = yield call(createUserProfile, userAuth, additionalData);
        const userSnapshot = yield userRef.get();
        yield put(signInSuccess({id: userSnapshot.id, ...userSnapshot.data()}));        
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* signInWithGoogle() {
    try{
        const {user} = yield auth.signInWithPopup(googleProvider);
        yield getSnapshotFromUser(user);
    } catch (error) {
        yield put(signInFailure(error));
        yield alert(error.message);
    }
}

export function* signInWithEmail({payload: {email, password}}) {
    try {
        const {user} = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapshotFromUser(user);
    } catch(error) {
        yield put(signInFailure(error));
        yield alert(error.message);
    }
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield getCurrentUser();
        if(!userAuth) {
            yield put(userIsNull());
            return;
        };
        yield getSnapshotFromUser(userAuth);
    } catch(error) {
        yield put(signInFailure(error));
    }
}

export function* signOut() {
    try {
        yield auth.signOut();
        yield put(signOutSuccess());
    } catch(error) {
        yield put(signOutFailure(error));
    }
}

export function* signUp({payload: {displayName, email, password}}) {
    try {
        const users = yield firestore.collection('users');
        const usersSnapshot = yield users.get();
        const userExists = yield usersSnapshot.docs.find(doc => doc.data().displayName === displayName);
        if(userExists) {
            alert('This DisplayName is already taken');
            throw new Error('This DisplayName is already taken');
        }
        const {user} = yield auth.createUserWithEmailAndPassword(email, password);
        yield put(signUpSuccess({user, additionalData: {displayName}}));
    } catch (error) {
        yield put(signUpFailure(error));
        yield alert(error.message);
    }
}

export function* deleteUser({payload: {presentPassword, currentUserId}}) {
    try {
        yield call(deleteUserAccount, presentPassword);
        yield firestore.doc(`users/${currentUserId}`).delete();
        yield put(signOutStart());
    } catch(error) {
        alert(error.message);
    }
}

export function* signInAfterSignUp({payload: {user, additionalData}}) {
    yield getSnapshotFromUser(user, additionalData);
}

export function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onCheckUserSession() {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onSignOutStart() {
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* onSignUpStart() {
    yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
    yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onUserDeleteStart() {
    yield takeLatest(UserActionTypes.DELETE_USER_START, deleteUser);
}

export function* onUserFollow() {
    yield takeLatest(UserActionTypes.FOLLOW_USER, followUser);
}

export function* onUserUnfollow() {
    yield takeLatest(UserActionTypes.UNFOLLOW_USER, unfollowUser);
}

export function* userSagas() {
    yield all([call(onGoogleSignInStart), call(onEmailSignInStart), call(onCheckUserSession), call(onSignOutStart), call(onSignUpStart), call(onSignUpSuccess), call(onUserFollow), call(onUserUnfollow), call(onUserDeleteStart)]);
}