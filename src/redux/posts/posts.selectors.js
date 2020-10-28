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

export const selectPostsNotifications = createSelector(
    [selectPosts],
    posts => posts.notification
);