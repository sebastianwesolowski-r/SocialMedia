import PostsActionTypes from './posts.types';

export const uploadPostStart = postData => ({
    type: PostsActionTypes.UPLOAD_POST_START,
    payload: postData
});

export const uploadPostSuccess = () => ({
    type: PostsActionTypes.UPLOAD_POST_SUCCESS
});

export const uploadPostFailure = error => ({
    type: PostsActionTypes.UPLOAD_POST_FAILURE,
    payload: error
});