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

export const likePost = likeData => ({
    type: PostsActionTypes.LIKE_POST,
    payload: likeData
});

export const dislikePost = dislikeData => ({
    type: PostsActionTypes.DISLIKE_POST,
    payload: dislikeData
});

export const commentPost = commentData => ({
    type: PostsActionTypes.COMMENT_POST,
    payload: commentData
});

export const updatePost = postData => ({
    type: PostsActionTypes.UPDATE_POST,
    payload: postData
});