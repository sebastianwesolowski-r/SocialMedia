import {createSelector} from 'reselect';

const selectUser = state => state.user;

export const selectCurrentUser = createSelector(
    [selectUser],
    user => user.currentUser
);

export const selectCurrentUserName = createSelector(
    [selectCurrentUser],
    user => user.displayName
);

export const selectCurrentUserId = createSelector(
    [selectCurrentUser],
    user => user.id
);

export const selectIsProcessing = createSelector(
    [selectUser],
    user => user.isProcessing
);

export const selectAccess = createSelector(
    [selectUser],
    user => user.access
);