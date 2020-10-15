import {takeLatest, put, all, call} from 'redux-saga/effects';

import UserActionTypes from './user.types';

import {signInSuccess, signInFailure, signOutStart, signOutSuccess, signOutFailure, signUpSuccess, signUpFailure, followUserSuccess, followUserFailure, unfollowUserSuccess, unfollowUserFailure} from './user.actions';
import {fetchPostsStart} from '../posts/posts.actions';

import {auth, firebaseSignInGoogle, firebaseSignInFacebook, firestore, loginUser, registerUser, deleteUserAccount} from '../../firebase/firebase';
import firebase from '../../firebase/firebase';

export function* followUser({payload: {profileId, profileDisplayName, currentUserId, currentUserDisplayName}}) {
    try {
        const userToFollowRef = yield firestore.doc(`users/${profileId}`);
        const currentUserRef = yield firestore.doc(`users/${currentUserId}`);
        yield userToFollowRef.update({
            followers: firebase.firestore.FieldValue.arrayUnion(currentUserDisplayName)
        });
        yield currentUserRef.update({
            following: firebase.firestore.FieldValue.arrayUnion(profileDisplayName)
        });
        yield put(followUserSuccess(profileDisplayName));
    } catch (e) {
        yield put(followUserFailure(e));
    }
}

export function* unfollowUser({payload: {profileId, profileDisplayName, currentUserId, currentUserDisplayName}}) {
    try {
        const userToUnfollowRef = yield firestore.doc(`users/${profileId}`);
        const currentUserRef = yield firestore.doc(`users/${currentUserId}`);
        yield userToUnfollowRef.update({
            followers: firebase.firestore.FieldValue.arrayRemove(currentUserDisplayName)
        });
        yield currentUserRef.update({
            following: firebase.firestore.FieldValue.arrayRemove(profileDisplayName)
        });
        yield put(unfollowUserSuccess(profileDisplayName));
    } catch (e) {
        yield put(unfollowUserFailure(e));
    }
}

export function* getSnapshotFromUser(userAuth) {
    try {
        const userRef = yield call(loginUser, userAuth);
        const userSnapshot = yield userRef.get();
        yield put(signInSuccess({id: userSnapshot.id, ...userSnapshot.data()}));
        yield put(fetchPostsStart());
    } catch (e) {
        yield put(signInFailure(e));
    }
}

export function* signInWithGoogle() {
    try {
        const {user} = yield firebaseSignInGoogle();
        yield getSnapshotFromUser(user);
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* signInWithFacebook() {
    try {
        const {user} = yield firebaseSignInFacebook();
        yield getSnapshotFromUser(user);
    } catch (error) {
        yield put(signInFailure(error));
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
        const usersRef = yield firestore.collection('users');
        const usersSnapshot = yield usersRef.get();
        const userExists = yield usersSnapshot.docs.find(doc => doc.data().displayName === displayName);
        if(userExists) {
            throw new Error('This DisplayName is already taken');
        }
        const {user} = yield auth.createUserWithEmailAndPassword(email, password);
        yield call(registerUser, user, {displayName});
        yield put(signUpSuccess());
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

export function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onFacebookSignInStart() {
    yield takeLatest(UserActionTypes.FACEBOOK_SIGN_IN_START, signInWithFacebook);
}

export function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onSignOutStart() {
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* onSignUpStart() {
    yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

export function* onUserDeleteStart() {
    yield takeLatest(UserActionTypes.DELETE_USER_START, deleteUser);
}

export function* onUserFollow() {
    yield takeLatest(UserActionTypes.FOLLOW_USER_START, followUser);
}

export function* onUserUnfollow() {
    yield takeLatest(UserActionTypes.UNFOLLOW_USER_START, unfollowUser);
}

export function* userSagas() {
    yield all([call(onGoogleSignInStart), call(onFacebookSignInStart), call(onEmailSignInStart), call(onSignOutStart), call(onSignUpStart), call(onUserFollow), call(onUserUnfollow), call(onUserDeleteStart)]);
}