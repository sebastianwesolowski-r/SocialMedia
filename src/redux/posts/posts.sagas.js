import {takeLatest, all, put, call} from 'redux-saga/effects';

import PostsActionTypes from './posts.types';

import {storage, createPost} from '../../firebase/firebase';

import {uploadPostSuccess, uploadPostFailure} from './posts.actions';

export function* uploadPost({payload: {postMessage, currentUserName, postImage}}) {
    let imageUrl = '';
    try {
        if(postImage) {
            yield storage.ref(`postImages/${postImage.name}`).put(postImage);
            imageUrl = yield storage.ref("postImages").child(postImage.name).getDownloadURL();
        }
        yield call(createPost, postMessage, currentUserName, imageUrl);
        yield put(uploadPostSuccess());
    } catch(error) {
        yield put(uploadPostFailure(error));
    }
}

export function* onPostUpload() {
    yield takeLatest(PostsActionTypes.UPLOAD_POST_START, uploadPost);
}

export function* postsSagas() {
    yield all([call(onPostUpload)]);
}