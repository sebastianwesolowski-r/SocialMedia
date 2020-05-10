import PostsActionTypes from './posts.types';

export const fetchPostsStart = () => ({
    type: PostsActionTypes.FETCH_POSTS_START
});

export const fetchPostsSuccess = posts => ({
    type: PostsActionTypes.FETCH_POSTS_SUCCESS,
    payload: posts
});

export const fetchPostsFailure = error => ({
    type: PostsActionTypes.UPLOAD_POST_FAILURE,
    payload: error
});

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