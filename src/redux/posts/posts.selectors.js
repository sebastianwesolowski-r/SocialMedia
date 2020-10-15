import {createSelector} from 'reselect';

const selectPosts = state => state.posts;

export const selectIsPostUploading = createSelector(
    [selectPosts],
    posts => posts.isUploading
);

export const selectUsersPosts = createSelector(
    [selectPosts],
    posts => posts.posts
);

export const selectPostById = postId => createSelector(
    [selectUsersPosts],
    posts => posts[postId]
);

export const selectPostLikes = postId => createSelector(
    [selectUsersPosts],
    posts => posts[postId].likes
);

export const selectPostComments = postId => createSelector(
    [selectUsersPosts],
    posts => posts[postId].comments
);