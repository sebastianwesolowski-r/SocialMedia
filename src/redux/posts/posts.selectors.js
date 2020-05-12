import {createSelector} from 'reselect';

const selectPosts = state => state.posts;

export const selectIsPostUpdating = createSelector(
    [selectPosts],
    posts => posts.isUpdating
);

export const selectPostsData = createSelector(
    [selectPosts],
    posts => posts.postsData
);

export const selectUserPosts = userName => createSelector(
    [selectPostsData],
    posts => Object.values(posts).filter(el => el.uploadedBy === userName)
);

export const selectPostLikes = postId => createSelector(
    [selectPostsData],
    posts => posts[postId].likes
);

export const selectPostComments = postId => createSelector(
    [selectPostsData],
    posts => posts[postId].comments
);