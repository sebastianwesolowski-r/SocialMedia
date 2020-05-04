import {createSelector} from 'reselect';

const selectUser = state => state.user;

export const selectCurrentUser = createSelector(
    [selectUser],
    user => user.currentUser
);

export const selectIsProcessing = createSelector(
    [selectUser],
    user => user.isProcessing
);

export const selectAccess = createSelector(
    [selectUser],
    user => user.access
);