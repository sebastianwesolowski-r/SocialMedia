import {takeLatest, all, put, call} from 'redux-saga/effects';

import PostsActionTypes from './posts.types';

import {storage, firestore, convertPostsSnapshotToMap, createPost} from '../../firebase/firebase';
import firebase from '../../firebase/firebase';

import {uploadPostSuccess, uploadPostFailure, fetchPostsStart, fetchPostsSuccess, fetchPostsFailure, updatePost} from './posts.actions';

export function* fetchPosts() {
    try {
        const postsRef = firestore.collection('posts');
        const snapshot = yield postsRef.get();
        const postsMap = yield call(convertPostsSnapshotToMap, snapshot);
        yield put(fetchPostsSuccess(postsMap));
    } catch(error) {
        yield put(fetchPostsFailure(error));
    }
}

export function* uploadPost({payload: {postMessage, currentUserName, postImage}}) {
    let imageUrl = '';
    try {
        if(postImage) {
            if (postImage.size > 5000000) {
                throw new Error('Image size is too big');
            }
            yield storage.ref(`postImages/${postImage.name}`).put(postImage);
            imageUrl = yield storage.ref("postImages").child(postImage.name).getDownloadURL();
        }
        yield call(createPost, postMessage, currentUserName, imageUrl);
        yield put(fetchPostsStart());
        yield put(uploadPostSuccess());
    } catch(error) {
        yield put(uploadPostFailure(error));
    }
}

export function* likePost({payload: {currentUserName, postId}}) {
    const postToLikeRef = yield firestore.doc(`posts/${postId}`);
    yield postToLikeRef.update({
        likes: firebase.firestore.FieldValue.arrayUnion(currentUserName)
    });
    yield updatePostState(postId);
}

export function* dislikePost({payload: {currentUserName, postId}}) {
    const postToDislikeRef = yield firestore.doc(`posts/${postId}`);
    yield postToDislikeRef.update({
        likes: firebase.firestore.FieldValue.arrayRemove(currentUserName)
    });
    yield updatePostState(postId);
}

export function* commentPost({payload: {currentUserName, comment, postId}}) {
    const postToCommentRef = yield firestore.doc(`posts/${postId}`);
    yield postToCommentRef.update({
        comments: firebase.firestore.FieldValue.arrayUnion({commentedBy: currentUserName, commentContent: comment})
    });
    yield updatePostState(postId);
}

export function* updatePostState(postId) {
    const postToUpdateRef = yield firestore.doc(`posts/${postId}`);
    const postSnapshot = yield postToUpdateRef.get();
    const postData = yield postSnapshot.data();
    yield postData.id = postId;
    yield put(updatePost(postData));
}

export function* onFetchPostsStart() {
    yield takeLatest(PostsActionTypes.FETCH_POSTS_START, fetchPosts);
}

export function* onPostUpload() {
    yield takeLatest(PostsActionTypes.UPLOAD_POST_START, uploadPost);
}

export function* onPostLike() {
    yield takeLatest(PostsActionTypes.LIKE_POST, likePost);
}

export function* onPostDislike() {
    yield takeLatest(PostsActionTypes.DISLIKE_POST, dislikePost);
}

export function* onPostComment() {
    yield takeLatest(PostsActionTypes.COMMENT_POST, commentPost);
}

export function* postsSagas() {
    yield all([call(onPostUpload), call(onFetchPostsStart), call(onPostLike), call(onPostDislike), call(onPostComment)]);
}