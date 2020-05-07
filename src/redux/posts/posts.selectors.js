import {createSelector} from 'reselect';

const selectPosts = state => state.posts;

export const selectIsPostUpdating = createSelector(
    [selectPosts],
    posts => posts.isUpdating
);